import { useState } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import axios from "axios";
import IPOLotteryJson from "../../../hardhat/artifacts/contracts/IPOLottery.sol/IPOLottery.json";
import { setSelectedIpo } from "../redux/selectedIpoSlice.js";
import { useNavigate } from "react-router-dom";

const CreateIPO = () => {
  const [form, setForm] = useState({
    companyName: "",
    winnerCount: "",
    primaryRegistrar: "",
    extraRegistrar1: "",
    extraRegistrar2: "",
    sebi: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateIPO = async () => {
    try {
      setStatus("Connecting to MetaMask...");

      // 1. Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setStatus("Deploying contract...");

      // 2. Prepare Contract Factory
      const ContractFactory = new ethers.ContractFactory(
        IPOLotteryJson.abi,
        IPOLotteryJson.bytecode,
        signer
      );

      // 3. Deploy contract
      const contract = await ContractFactory.deploy(
        parseInt(form.winnerCount),
        form.primaryRegistrar,
        form.extraRegistrar1,
        form.extraRegistrar2
      );

      await contract.waitForDeployment();
      const contractAddress = await contract.getAddress();
      setStatus(`Contract deployed at ${contractAddress}`);

      // 4. Send IPO details to backend
      setStatus("Saving IPO in backend...");

      try {
        const response = await axios.post("http://localhost:8000/api/ipo/create", {
          companyName: form.companyName,
          winnerCount: parseInt(form.winnerCount),
          primaryRegistrar: form.primaryRegistrar,
          extraRegistrar1: form.extraRegistrar1,
          extraRegistrar2: form.extraRegistrar2,
          sebi: await signer.getAddress(),
          contractAddress,
        });

        if (response.status === 201) {
          setStatus("IPO created successfully!");
          setForm({
            companyName: "",
            winnerCount: "",
            primaryRegistrar: "",
            extraRegistrar1: "",
            extraRegistrar2: "",
            sebi: "",
          });
          dispatch(setSelectedIpo(response.data.ipo._id));
          navigate("/IPO");
        } else {
          setStatus("Failed to save IPO on backend.");
        }
      } catch (error) {
        console.error("Error saving IPO:", error);
        setStatus("Error saving IPO on backend.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error occurred while creating IPO.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Create New IPO</h2>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="number"
          name="winnerCount"
          placeholder="Number of Winners"
          value={form.winnerCount}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="primaryRegistrar"
          placeholder="Primary Registrar Address"
          value={form.primaryRegistrar}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="extraRegistrar1"
          placeholder="Extra Registrar 1 Address"
          value={form.extraRegistrar1}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="extraRegistrar2"
          placeholder="Extra Registrar 2 Address"
          value={form.extraRegistrar2}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          onClick={handleCreateIPO}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Create IPO Lottery
        </button>

        {status && <p className="text-sm text-center text-gray-600">{status}</p>}
      </div>
    </div>
  );
};

export default CreateIPO;
