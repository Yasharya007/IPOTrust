import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UploadApplicants from "./UploadApplicants.jsx";
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
    <UploadApplicants contractAddress={ipo.contractAddress} />
    </>
  );
};

export default IPO;
