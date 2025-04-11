import express from "express";
import { createIpo,getAllIpos,getIpoById } from "../controllers/IPO.js";

const router = express.Router();

router.post("/create", createIpo);
router.get("/all", getAllIpos);
router.get("/get/:id", getIpoById);

export default router;
