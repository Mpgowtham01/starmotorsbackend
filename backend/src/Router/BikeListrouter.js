import express from "express";
import {
  createBike,
  deleteBike,
  getAllBikes,
  getBikeById,
  updateBike,
} from "../controller/BikeListController.js";

const router = express.Router();

router.post("/create", createBike);
router.get("/getall", getAllBikes);
router.get("/getbike/:id", getBikeById);
router.put("/update/:id", updateBike);
router.delete("/:id", deleteBike);

export default router;
