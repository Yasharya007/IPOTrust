import { useState } from "react";
import { ethers } from "ethers";
import IPOLottery from "../../../hardhat/artifacts/contracts/IPOLottery.sol/IPOLottery.json";

const SubmitSeeds = ({ contractAddress }) => {
  const [Seed, setSeed] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      setStatus("Connecting wallet...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, IPOLottery.abi, signer);
        setStatus("Submitting seed...");
        const tx = await contract.submitSeed(Seed);
        await tx.wait();
        setStatus("Seed submitted!");
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Submit Randomness Seed</h2>

      <div className="space-y-2">
        <label className="block font-medium">Seed:</label>
        <input
          type="number"
          value={Seed}
          onChange={(e) => setSeed(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={() => handleSubmit()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Your seed
        </button>
      </div>

      <p className="text-sm text-gray-700 mt-2">{status}</p>
    </div>
  );
};

export default SubmitSeeds;
