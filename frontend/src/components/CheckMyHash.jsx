import { useState } from "react";
import { ethers } from "ethers";

const CheckMyHash = () => {
  const [dematId, setDematId] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!dematId.trim()) return;
    const computedHash = ethers.keccak256(ethers.toUtf8Bytes(dematId.trim()));
    setHash(computedHash);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Check Your Demat Hash</h2>

      <input
        type="text"
        placeholder="Enter your Demat ID"
        className="w-full border p-2 rounded"
        value={dematId}
        onChange={(e) => setDematId(e.target.value)}
      />

      <button
        onClick={handleConvert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Get Hash
      </button>

      {hash && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 break-words">
            <strong>Your Hash:</strong> {hash}
          </p>
          <button
            onClick={handleCopy}
            className="mt-2 text-sm text-blue-600 underline"
          >
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckMyHash;
