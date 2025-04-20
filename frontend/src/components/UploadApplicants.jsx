import { useState } from "react";
import Papa from "papaparse";
import { ethers } from "ethers";
import IPOLottery from "../../../hardhat/artifacts/contracts/IPOLottery.sol/IPOLottery.json";
import axios from "axios";
const UploadApplicants = ({ contractAddress }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
  
    setStatus("Parsing CSV...");
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const dematIds = results.data.map((row) => row.dematId.trim());
          const hashedIds = dematIds.map((id) =>
            ethers.keccak256(ethers.toUtf8Bytes(id))
          );
          const applicantDematMap = dematIds.map((id, index) => ({
            dematId: id,
            hash: hashedIds[index],
          }));
  
          setStatus("Connecting wallet...");
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            IPOLottery.abi,
            signer
          );
  
          setStatus("Sending transaction to contract...");
          const tx = await contract.addMultipleHashedApplicants(hashedIds);
          await tx.wait();
  
          setStatus("Saving hashed IDs to backend...");
          axios.post("http://localhost:8000/api/ipo/addApplicants", {
            contractAddress,
            applicantDematMap,
          })
          .then((res) => {
            if (res.status === 200) {
              setStatus("Applicants added successfully!");
            } else {
              setStatus("Contract updated, but failed to save in backend.");
            }
          })
          .catch((error) => {
            console.error("Backend saving failed:", error);
            setStatus("Contract updated, but failed to save in backend.");
          });
        } catch (err) {
          console.error(err);
          setStatus("Failed to process file or send transaction.");
        }
      },
    });
  };

  return (
    <div className="p-6 border rounded-2xl bg-white shadow-lg max-w-md mx-auto">
  <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Upload Demat ID CSV</h2>

  <label className="block w-full cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-500 text-sm rounded-lg px-4 py-10 text-center transition-all duration-200">
    <input
      type="file"
      accept=".csv"
      onChange={handleFileChange}
      className="hidden"
    />
    <span className="block font-medium">Click to upload or drag and drop</span>
    <span className="block text-xs mt-1 text-gray-400">Only .csv files accepted</span>
  </label>

  <button
    onClick={handleUpload}
    className="w-full mt-6 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
  >
    Upload
  </button>

  {status && (
    <p className="mt-3 text-sm text-center text-gray-600">{status}</p>
  )}
</div>

  );
};

export default UploadApplicants;
