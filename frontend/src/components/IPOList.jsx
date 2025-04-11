import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedIpo } from "../redux/selectedIpoSlice.js";
const IPOList = () => {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleIPOClick = (ipoId) => {
    dispatch(setSelectedIpo(ipoId));
    navigate("/IPO");
  };
  useEffect(() => {
    const fetchIpos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/ipo/all");
        setIpos(res.data);
      } catch (error) {
        console.error("Error fetching IPOs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIpos();
  }, []);

  if (loading) return <div>Loading IPOs...</div>;
  if (ipos.length === 0) return <div>No ongoing IPOs found. <button
  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 mx-5 rounded-2xl shadow-md transition duration-300 ease-in-out"
  onClick={() => navigate("/create")}
>
  Create New IPO
</button></div>;

  return (
    <>
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ongoing IPOs</h2>
      <div className="grid grid-cols-1 gap-4">
        {ipos.map((ipo) => (
          <div
          key={ipo._id}
          onClick={() => handleIPOClick(ipo._id)}
          className="p-4 bg-white rounded-xl shadow-md border cursor-pointer hover:shadow-lg transition"
        >        
            <p><strong>Company:</strong> {ipo.companyName}</p>
            <p><strong>Contract:</strong> {ipo.contractAddress}</p>
            <p><strong>Winners:</strong> {ipo.winnerCount}</p>
            <p><strong>Registrar:</strong> {ipo.registrar}</p>
            <p><strong>SEBI:</strong> {ipo.sebi}</p>
          </div>
        ))}
      </div>
    </div>
    <div>
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 mx-5 rounded-2xl shadow-md transition duration-300 ease-in-out" onClick={() => navigate("/create")}>
      Create New IPO
    </button>
    </div>
    </>
  );
};

export default IPOList ;
