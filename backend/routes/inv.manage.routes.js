import express from 'express'
const  router = express.Router()

import { getInventory, postInventory, postBuyerRequest, getAllBuyRequests, deleteInventory } from "../controllers/inventoryManager.controller.js";

router.get("/getAllInventory", getInventory);
router.post("/postInventory", postInventory);
router.post('/postBuyerReq', postBuyerRequest);
router.get('/getAllBuyReq', getAllBuyRequests);
router.delete("/deleteInv/:id", deleteInventory);

export default router;