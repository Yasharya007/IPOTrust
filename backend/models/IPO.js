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
  primaryRegistrar: {
    type: String,
    required: true, // wallet address
  },
  extraRegistrar1: {
    type: String,
    required: true, // wallet address
  },
  extraRegistrar2: {
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
    enum: ["contractDeployed", "lotteryCompleted"],
    default: "contractDeployed",
  },
  applicantDematMap: [{
    dematId: String,
    hash: String
  }],
  winners: [{
    hash: String,
    dematId: String, // real ID resolved via backend mapping
  }],  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Ipo = mongoose.model("Ipo", ipoSchema);
