import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedIpo } from "../redux/selectedIpoSlice.js";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
      {/* <h2 className="text-xl font-bold mb-4">Ongoing IPOs</h2> */}
      <p className="max-w-2xl text-5xl mt-2 mb-8 font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance">
      Ongoing IPOs
        </p>
      <div className="divide-y border border-gray-100 divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow-xsm sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {ipos.map((ipo) => (
          <div
            key={ipo._id}
            onClick={() => handleIPOClick(ipo._id)}
            className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-inset cursor-pointer transition rounded-none sm:rounded-none"
          >
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                <span className="absolute inset-0" aria-hidden="true" />
                {ipo.companyName}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                <strong>Contract:</strong> {ipo.contractAddress}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <strong>Winners:</strong> {ipo.winnerCount}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <strong>Registrar:</strong> {ipo.registrar}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <strong>SEBI:</strong> {ipo.sebi}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="size-6">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
    <div>
    <button
      className="bg-green-500 hover:bg-green-600 mt-8 text-white font-semibold py-2 px-6 mx-5 rounded-2xl shadow-md transition duration-300 ease-in-out" onClick={() => navigate("/create")}>
      Create New IPO
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-600 mt-8 text-white font-semibold py-2 px-6 mx-5 rounded-2xl shadow-md transition duration-300 ease-in-out" onClick={() => navigate("/check")}>
      Check My Hash
    </button>
    </div>
    </>
  );
};

export default IPOList ;
