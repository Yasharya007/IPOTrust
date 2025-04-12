import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UploadApplicants from "./UploadApplicants.jsx";
import SubmitSeeds from "./SubmitSeeds.jsx";
import RunLottery from "./RunLottery.jsx";
import axios from "axios";

const IPO = () => {
  const ipoId = useSelector((state) => state.selectedIpo.ipoId);
  const [ipo, setIpo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIpoDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/ipo/get/${ipoId}`);
        setIpo(res.data);
      } catch (error) {
        console.error("Error fetching IPO details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ipoId) fetchIpoDetails();
  }, [ipoId]);

  if (loading) return <div>Loading IPO details...</div>;
  if (!ipo) return <div>IPO not found.</div>;

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">IPO Details</h2>
        <p><strong>Company:</strong> {ipo.companyName}</p>
        <p><strong>Contract Address:</strong> {ipo.contractAddress}</p>
        <p><strong>Winner Count:</strong> {ipo.winnerCount}</p>
        <p><strong>Registrar:</strong> {ipo.registrar}</p>
        <p><strong>SEBI:</strong> {ipo.sebi}</p>
        <p><strong>Status:</strong> {ipo.status}</p>
      </div>

      {ipo.applicantDematMap?.length === 0 && (
        <UploadApplicants contractAddress={ipo.contractAddress} />
      )}

      <SubmitSeeds contractAddress={ipo.contractAddress} />

      {ipo.winners?.length === 0 && (
        <RunLottery contractAddress={ipo.contractAddress} />
      )}

      {ipo.winners?.length > 0 && (
        <div className="mt-4 ml-5">
        <h3 className="text-lg font-semibold">Winners:</h3>
        <ul className="list-disc list-inside text-sm text-gray-800">
          {ipo.winners.map((hash, idx) => (
            <li key={idx}>{hash.dematId}</li>
          ))}
        </ul>
      </div>

      )}
    </>
  );
};

export default IPO;
