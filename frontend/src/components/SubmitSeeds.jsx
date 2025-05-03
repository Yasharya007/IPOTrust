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
    <div className="max-w-sm mx-auto w-full rounded-2xl mb-4 bg-white ring-1 ring-gray-200 shadow-md">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-base font-semibold leading-6 text-gray-900">Submit Randomness Seed</h2>
        <p className="mt-1 text-sm text-gray-500">Enter a secure random seed for the lottery process.</p>

        <div className="mt-4">
          <label className="block font-medium text-sm text-gray-700 mb-1">Seed:</label>
          <input
            type="number"
            value={Seed}
            onChange={(e) => setSeed(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="p-6">
        <dl className="text-sm space-y-4 text-gray-600">
          <div className="flex justify-between">
            <dt>Status</dt>
            <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {status || "Idle"}
            </dd>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Submit Your Seed
          </button>
        </dl>
      </div>
    </div>
  );
};

export default SubmitSeeds;
