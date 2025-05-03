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
      <div className="mx-auto max-w-4xl rounded-xl bg-white px-6 py-10 shadow-md mt-4 mb-4 ring-1 ring-gray-200 sm:px-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">IPO Details</h2>
        <dl className="grid grid-cols-1 gap-y-6 gap-x-8 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-gray-500">Company</dt>
            <dd className="text-gray-800 font-medium">{ipo.companyName}</dd>
          </div>
          
          <div className="col-span-2">
            <dt className="text-gray-500">Contract Address</dt>
            <dd className="text-gray-800 font-medium flex items-center gap-2">
              <a
                href={`https://sepolia.etherscan.io/address/${ipo.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline flex items-center gap-1"
              >
                {ipo.contractAddress}
                <img
                  src="https://sepolia.etherscan.io/images/brandassets/etherscan-logo-circle.svg"
                  alt="Etherscan"
                  className="w-4 h-4"
                />
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Primary Registrar</dt>
            <dd className="text-gray-800 font-medium">{ipo.primaryRegistrar}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Witness Registrar 1</dt>
            <dd className="text-gray-800 font-medium">{ipo.extraRegistrar1}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Witness Registrar 2</dt>
            <dd className="text-gray-800 font-medium">{ipo.extraRegistrar2}</dd>
          </div>
          <div>
            <dt className="text-gray-500">SEBI</dt>
            <dd className="text-gray-800 font-medium">{ipo.sebi}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Winner Count</dt>
            <dd className="text-gray-800 font-medium">{ipo.winnerCount}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Status</dt>
            <dd className="text-gray-800 font-medium">{ipo.status}</dd>
          </div>
        </dl>
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
