import {Ipo} from "../models/IPO.js";


export const createIpo = async (req, res) => {
  try {
    const { companyName, winnerCount, registrar, sebi, contractAddress } = req.body;

    // Basic validation
    if (!companyName || !winnerCount || !registrar || !sebi || !contractAddress) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newIpo = new Ipo({
      companyName,
      winnerCount,
      registrar,
      sebi,
      contractAddress,
    });

    await newIpo.save();

    return res.status(201).json({ message: "IPO created", ipo: newIpo });
  } catch (error) {
    console.error("Error creating IPO:", error);
    return res.status(500).json({ message: "Server error while creating IPO" });
  }
};
