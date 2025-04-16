import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Papa from "papaparse";
function CheckList() {
    const ipoId = useSelector((state) => state.selectedIpo.ipoId);
    const [ipo, setIpo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [walletAddress, setWalletAddress] = useState(null);
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWalletAddress(accounts[0]);
        } catch (err) {
          console.error("Wallet connection failed:", err);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };
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
    const handleDownloadCSV = () => {
      if (!ipo?.winners?.length) return;
    
      const csv = Papa.unparse(ipo.winners); // uses [{ hash, dematId }]
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${ipo.companyName}_winners.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    if (loading) return <div>Loading IPO details...</div>;
    if (!ipo) return <div>IPO not found.</div>;
  return (
    <>
    <button onClick={connectWallet} className="bg-blue-600 mx-5 my-5 text-white px-3 py-1 rounded">
      {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
    </button>
    {ipo.winners?.length > 0 &&(walletAddress?.toLowerCase() === ipo.primaryRegistrar?.toLowerCase()) && (
        <div className="mt-4 mx-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Winners:</h3>
            <button
              onClick={handleDownloadCSV}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
            >
              Download CSV
            </button>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-800">
            {ipo.winners.map((hash, idx) => (
              <li key={idx}>{hash.dematId}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default CheckList