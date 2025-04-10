import express from "express";
import { createIpo } from "../controllers/IPO.js";

const router = express.Router();

router.post("/create", createIpo);

export default router;
