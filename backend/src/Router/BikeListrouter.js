import express from "express";
import {
  createBike,
  deleteBike,
  getAllBikes,
  getBikeById,
  updateBike,
} from "../controller/BikeListController.js";
import { saveSellBike } from "../controller/sellBikeController.js";
import { sendContactMessage } from "../controller/contactController.js";

const router = express.Router();

router.post("/create", createBike);
router.get("/getall", getAllBikes);
router.get("/getbike/:id", getBikeById);
router.put("/update/:id", updateBike);
router.delete("/delete/:id", deleteBike);

router.post("/sell-bike", saveSellBike);

router.post("/send-message", sendContactMessage);

export default router;
