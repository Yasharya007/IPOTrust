
# IPOTrust 🏛️

A Blockchain-based IPO Allocation Framework that ensures **fairness**, **transparency**, and **privacy** using **Solidity smart contracts** on the Ethereum blockchain. Designed for SEBI and multiple registrars to collaboratively run a verifiable and tamper-proof lottery for IPO share allocation.

## 🧩 Overview

IPOTrust decentralizes the traditional IPO allotment process using smart contracts. It ensures that applicants are selected through a verifiable lottery system, using multi-party cryptographic seeds for randomness. Privacy is maintained by storing only **SHA-256 hashed DMAT IDs** on-chain.

### Key Roles
- **SEBI**: Deploys the contract, reviews results.
- **Primary Registrar**: Uploads applicant hashes, triggers lottery.
- **Extra Registrars**: Submit randomness seeds.
- **Applicants**: Verify if their DMAT was included using the public contract data on Etherscan.

---

## 🚀 Features

- ✅ Fair and deterministic lottery based on multi-party seed input.
- 🔐 Applicant privacy via SHA-256 hashing.
- 📦 Secure backend storage of DMAT-hash mapping.
- 📄 Downloadable CSV for winners (SEBI and registrar only).
- 🌐 Public verification of inclusion via Etherscan.

---

## 🛠️ Tech Stack

| Layer        | Tech                                 |
|--------------|--------------------------------------|
| Blockchain   | Solidity, Ethereum (Sepolia/Mainnet) |
| Dev Tools    | Hardhat, Ethers.js                   |
| Frontend     | React.js (with Ethers.js)            |
| Backend      | Node.js, Express.js                  |
| Hashing      | Crypto (SHA-256)                     |

---

## 📂 Project Structure

```
├── hardhat
│   ├── contracts
│   │   └── IPOLottery.sol      # Core smart contract
│   ├── test                    # Test files
│   └── hardhat.config.js       # contain deployment keys 
├── backend
│   ├── controllers
│   ├── models
│   ├── routes                  
│   └── index.js
├── frontend
│   └── src
│       ├── components          # React components
│       ├── App.jsx 
│       └── main.jsx             
└── README.md
```

---

## 📦 Installation & Setup

1. **Clone the Repository**
   ```
   git clone https://github.com/yasharya007/IPOTrust.git
   cd IPOTrust
   ```

2. **Install Dependencies**
   ```
   npm install         # For backend & frontend (run separately in each folder)
   cd hardhat && npm install
   ```

3. **Configure Environment for hardhat**
   Create a `.env` file with in hardhat folder:
   ```
   PRIVATE_KEY=your_wallet_private_key
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
   ETHERSCAN_API_KEY=your_etherscan_key
   ```

4. **Compile Smart Contract**
   ```
   npx hardhat compile
   ```

5. **Start Backend Server and Frontend**
   ```
   cd frontend
   npm run dev
   ```

---

## 🔍 Contract Verification (Etherscan)

After deployment, the smart contract can be verified automatically using Hardhat's Etherscan plugin.

```
npx hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS> "constructor_arg1" ...
```

---

## 📊 How It Works

1. SEBI deploys the contract with 3 registrar addresses and winner count.
2. Primary Registrar uploads SHA-256 hashed DMAT IDs.
3. SEBI and all 3 registrars submit their randomness seeds.
4. Primary Registrar calls `runLottery()` once all seeds are submitted.
5. Contract selects winners using deterministic pseudorandom logic.
6. Backend maps winning hashes to DMATs and provides SEBI with a CSV file.
7. Applicants can hash their DMAT and verify inclusion publicly.

---

## 🔒 Privacy & Integrity

- Only SHA-256 hashes are stored on-chain.
- DMAT-to-hash mapping is kept secure in the backend.
- Applicants can self-verify on-chain inclusion without exposing identity.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

**Yash Arya**  
[LinkedIn](https://linkedin.com/in/yasharya007) • [GitHub](https://github.com/yasharya007)

---

## ⭐ Contribute

Pull requests and suggestions are welcome! Feel free to fork the repo and submit a PR.
