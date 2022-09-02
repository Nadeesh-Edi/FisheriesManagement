import express from "express";

const router = express.Router();

import {
  getAllBoats,
  getBoatsById,
  registerBoat,
  deleteBoat,
  updateBoat,
} from "../controllers/boat.controller.js";

router.post("/registerboat", registerBoat);
router.get("/allboats", getAllBoats);
router.route("/:id").get(getBoatsById).delete(deleteBoat).put(updateBoat);

export default router;