import express from 'express'
const  router = express.Router()

import { getInventory, postInventory } from "../controllers/inventoryManager.controller.js";

router.get("/getAllInventory", getInventory);
router.get("/postInventory", postInventory);

export default router;