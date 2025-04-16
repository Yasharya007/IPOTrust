import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UploadApplicants from "./UploadApplicants.jsx";
import SubmitSeeds from "./SubmitSeeds.jsx";
import RunLottery from "./RunLottery.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IPO = () => {
  const ipoId = useSelector((state) => state.selectedIpo.ipoId);
  const [ipo, setIpo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
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
        <p><strong>Primary Registrar:</strong> {ipo.primaryRegistrar}</p>
        <p><strong>Witness Registrar 1:</strong> {ipo.extraRegistrar1}</p>
        <p><strong>Witness Registrar 2:</strong> {ipo.extraRegistrar2}</p>
        <p><strong>SEBI:</strong> {ipo.sebi}</p>
        <p><strong>Status:</strong> {ipo.status}</p>
      </div>

      {ipo.applicantDematMap?.length === 0 && (
        <UploadApplicants contractAddress={ipo.contractAddress} />
      )}
      {ipo.winners?.length === 0 && (
        <SubmitSeeds contractAddress={ipo.contractAddress} />
      )}
      {ipo.winners?.length === 0 && (
        <RunLottery contractAddress={ipo.contractAddress} />
      )}

      {ipo.winners?.length > 0 && (
        <button
        onClick={() => navigate("/result")}
        className="bg-purple-600 text-white mx-5 px-4 py-2 rounded hover:bg-purple-700"
      >
        Check Result
      </button>
      )}
    </>
  );
};

export default IPO;
