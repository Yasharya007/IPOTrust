import { useState } from "react";
import { ethers } from "ethers";
import IPOLottery from "../../../hardhat/artifacts/contracts/IPOLottery.sol/IPOLottery.json";

const SubmitSeeds = ({ contractAddress }) => {
  const [registrarSeed, setRegistrarSeed] = useState("");
  const [sebiSeed, setSebiSeed] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (role) => {
    try {
      setStatus("Connecting wallet...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, IPOLottery.abi, signer);

      if (role === "registrar") {
        setStatus("Submitting registrar seed...");
        const tx = await contract.submitRegistrarSeed(registrarSeed);
        await tx.wait();
        setStatus("Registrar seed submitted!");
      } else {
        setStatus("Submitting SEBI seed...");
        const tx = await contract.submitSEBISeed(sebiSeed);
        await tx.wait();
        setStatus("SEBI seed submitted!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Submit Randomness Seeds</h2>

      <div className="space-y-2">
        <label className="block font-medium">Registrar Seed:</label>
        <input
          type="number"
          value={registrarSeed}
          onChange={(e) => setRegistrarSeed(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={() => handleSubmit("registrar")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit as Registrar
        </button>
      </div>

      <div className="space-y-2">
        <label className="block font-medium">SEBI Seed:</label>
        <input
          type="number"
          value={sebiSeed}
          onChange={(e) => setSebiSeed(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={() => handleSubmit("sebi")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit as SEBI
        </button>
      </div>

      <p className="text-sm text-gray-700 mt-2">{status}</p>
    </div>
  );
};

export default SubmitSeeds;
