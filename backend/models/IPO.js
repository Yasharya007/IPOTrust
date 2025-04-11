import mongoose from "mongoose"

const ipoSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  winnerCount: {
    type: Number,
    required: true,
  },
  registrar: {
    type: String,
    required: true, // wallet address
  },
  sebi: {
    type: String,
    required: true, // wallet address
  },
  contractAddress: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["contractDeployed", "seedsSubmitted", "lotteryCompleted"],
    default: "contractDeployed",
  },
  applicantDematHashes: {
    type: [String],
    default: [],
  },
  winnerHashes: {
    type: [String], // store hashed IDs of winners
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Ipo = mongoose.model("Ipo", ipoSchema);
