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
    <div className="p-4 border rounded-xl bg-white shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload Demat ID CSV</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
      <p className="mt-2 text-sm text-gray-600">{status}</p>
    </div>
  );
};

export default UploadApplicants;
