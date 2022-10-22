import express from "express";
const router = express.Router();

import {
  getInventory,
  postInventory,
  postBuyerRequest,
  getAllBuyRequests,
  deleteInventory,
  updateInventoryAssigned,
  createAssignedList,
  updateInventoryUnassigned,
  getAllAssigned,
  getAssignedByReqId,
  deleteAssigned,
  removeAssignedInv,
  editAssigned,
  loginUser,
  register,
} from "../controllers/inventoryManager.controller.js";

router.get("/getAllInventory", getInventory);
router.post("/postInventory", postInventory);
router.post("/postBuyerReq", postBuyerRequest);
router.get("/getAllBuyReq", getAllBuyRequests);
router.delete("/deleteInv/:id", deleteInventory);
router.post("/updateToAssigned/:id", updateInventoryAssigned);
router.post("/createAssigned", createAssignedList);
router.post("/updateToUnassigned/:id", updateInventoryUnassigned);
router.get('/getAllAssigned', getAllAssigned);
router.get('/getAssignedByReq/:id', getAssignedByReqId);
router.delete('/deleteAssigned/:id', deleteAssigned);
router.put('/removeAssignedInv', removeAssignedInv);
router.put('/editAssigned/:id', editAssigned);
router.post('/login', loginUser);
router.post('/register', register);

export default router;
