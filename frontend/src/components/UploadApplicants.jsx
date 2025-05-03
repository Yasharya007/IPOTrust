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
    <div className="max-w-sm mx-auto rounded-2xl mb-4 bg-white ring-1 ring-gray-200 shadow-md">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-base font-semibold leading-6 text-gray-900">Upload Demat ID CSV</h2>
        <p className="mt-1 text-sm text-gray-500">Ensure the file contains valid demat Id in column.</p>

        <label className="mt-4 flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="text-center text-gray-500 text-sm">
            <p className="font-medium">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-400 mt-1">Only .csv files accepted</p>
          </div>
        </label>

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
          onClick={handleUpload}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Upload
        </button>
         
        </dl>

        
      </div>
    </div>
  );
};

export default UploadApplicants;
