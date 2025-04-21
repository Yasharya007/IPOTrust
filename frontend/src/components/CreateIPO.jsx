import { useState } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import axios from "axios";
import IPOLotteryJson from "../../../hardhat/artifacts/contracts/IPOLottery.sol/IPOLottery.json";
import { setSelectedIpo } from "../redux/selectedIpoSlice.js";
import { useNavigate } from "react-router-dom";


// 
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

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

      // Check if it is only sebi
      const connectedAddress = (await signer.getAddress()).toLowerCase();

      const sebiAddress = "0xadE9B0BD35243bf5065d802093A4e1fB7C92Af3a".toLowerCase();// SEBI adress that one is allowed
  
      if (connectedAddress !== sebiAddress) {
        setStatus("Access denied: only SEBI can create IPOs.");
        return;
      }
  
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateIPO();
      }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-6xl font-semibold text-gray-900">Create New IPO</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-600">
            This information will be shared with SEBI so be careful what you share.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
                Company Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={form.companyName}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="winnerCount" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
                Number of Winners
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="winnerCount"
                  name="winnerCount"
                  type="number"
                  value={form.winnerCount}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="primaryRegistrar" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
                Primary Registrar Address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="primaryRegistrar"
                  name="primaryRegistrar"
                  type="text"
                  value={form.primaryRegistrar}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:max-w-md sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="extraRegistrar1" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
                Extra Registrar 1 Address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="extraRegistrar1"
                  name="extraRegistrar1"
                  type="text"
                  value={form.extraRegistrar1}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:max-w-xl sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="extraRegistrar2" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
                Extra Registrar 2 Address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="extraRegistrar2"
                  name="extraRegistrar2"
                  type="text"
                  value={form.extraRegistrar2}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:max-w-xl sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-sm font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>

      {status && <p className="text-sm text-center text-gray-600 mt-4">{status}</p>}
    </form>
  );
};

export default CreateIPO;
