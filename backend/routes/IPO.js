import express from "express";
import { createIpo,getAllIpos,getIpoById,addApplicants,saveWinners} from "../controllers/IPO.js";

const router = express.Router();

router.post("/create", createIpo);
router.get("/all", getAllIpos);
router.get("/get/:id", getIpoById);
router.post("/addApplicants",addApplicants);
router.post("/saveWinners",saveWinners);
export default router;
