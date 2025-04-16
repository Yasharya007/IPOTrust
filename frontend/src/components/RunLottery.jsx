import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import IPOLottery from "../../../hardhat/artifacts/contracts/IPOLottery.sol/IPOLottery.json";
import { useNavigate } from "react-router-dom";
const RunLottery = ({ contractAddress }) => {
  const [status, setStatus] = useState("");
  // const [winnerHashes, setWinnerHashes] = useState([]);
  const navigate=useNavigate();
  const handleRunLottery = async () => {
    try {
      setStatus("Connecting wallet...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, IPOLottery.abi, signer);

      setStatus("Running lottery...");
      const tx = await contract.runLottery();
      await tx.wait();

      setStatus("Fetching winner hashes...");
      const winners = await contract.getWinnerHashes();
      setWinnerHashes(winners);
      setStatus("Lottery completed successfully!");

      axios.post("http://localhost:8000/api/ipo/saveWinners", {
        contractAddress,
        winnerHashes: winners,
      })
      .then((res) => {
        console.log("Saved winners to backend:", res.data.winners);
        navigate("/result");
      })
      .catch((err) => {
        console.error("Failed to save winners:", err);
      });
    } catch (error) {
      console.error(error);
      setStatus("Failed to run lottery.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Run Lottery</h2>
      <button
        onClick={handleRunLottery}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Run Lottery
      </button>
      <p className="text-sm text-gray-700">{status}</p>

      {/* {winnerHashes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Winner Hashes:</h3>
          <ul className="list-disc list-inside text-sm text-gray-800">
            {winnerHashes.map((hash, idx) => (
              <li key={idx}>{hash}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default RunLottery;
