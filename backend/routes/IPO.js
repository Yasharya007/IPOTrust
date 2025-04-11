import express from "express";
import { createIpo,getAllIpos,getIpoById,addApplicants} from "../controllers/IPO.js";

const router = express.Router();

router.post("/create", createIpo);
router.get("/all", getAllIpos);
router.get("/get/:id", getIpoById);
router.post("/addApplicants",addApplicants);

export default router;
