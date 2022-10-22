import asyncHandler from "express-async-handler";
import express from "express";
import Inventories from "../models/inventory.model.js";
import BuyerRequests from "../models/buyerRequest.model.js";
import Users from "../models/UserModel.js";
import { ObjectId } from "mongodb";
import orderDet from "../models/OrderModel.js";
import AssignedInventories from "../models/assignedInventory.js";
const router = express.Router();

// Get all inventory
const getInventory = asyncHandler(async (req, res) => {
  const inventory = await Inventories.find({});
  res.json(inventory);
});

// // Sort by boat Id
// const sortByBoatId = asyncHandler(async (req, res) => {
//     const
// })

// Create inventory
const postInventory = asyncHandler(async (req, res) => {

    const {boatName, owner, inventoryDate, fishType, qty} = req.body;

    const inventory = new Inventories({
        boatName, 
        owner, 
        inventoryDate, 
        fishType, 
        qty
    })

    try {
        inventory.save().then(() => {
            res.status(201).json(inventory);
        }).catch(err => {
            console.log(err)
        })
    }
    catch {
        res.status(400)
    }
})


// Get all buyer requests
const getAllBuyRequests = asyncHandler(async (req, res) => {
  const requests = await orderDet.find({});
  res.json(requests);
});
// const getAllBuyRequests = asyncHandler(async (req, res) => {
//     const requests = await BuyerRequests.find({});
//     res.json(requests);
// })

// Create Buyer Request
const postBuyerRequest = asyncHandler(async (req, res) => {
  const { requester, fishType, qty } = req.body;

  const buyRequest = new BuyerRequests({
    requester,
    fishType,
    qty,
  });

  try {
    buyRequest
      .save()
      .then(() => {
        res.status(201).json(buyRequest);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch {
    res.status(400);
  }
});

// Update inventory as assigned
const updateInventoryAssigned = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const inventory = await Inventories.findOneAndUpdate(
      { _id: ObjectId(id) },
      { assign: true }
    );
    res.json(inventory);
  } catch {
    res.status(400);
  }
});

// Update inventory as unassigned
const updateInventoryUnassigned = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const inventory = await Inventories.findOneAndUpdate(
      { _id: ObjectId(id) },
      { assign: false }
    );
    res.json(inventory);
  } catch {
    res.status(400);
  }
});

// Create assigned Inventory
const createAssignedList = asyncHandler(async (req, res) => {
  const { inventoryList, order } = req.body;

  const assign = new AssignedInventories({
    inventory: inventoryList,
    order: order,
  });

  try {
    assign
      .save()
      .then(async() => {
        const order = await orderDet.updateOne({ _id: ObjectId(order.id) }, { assigned:true });
        res.status(201).json(assign);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch {
    res.status(400);
  }
});

// Get all assigned list
const getAllAssigned = asyncHandler(async (req, res) => {
    const assigned = await AssignedInventories.find({});
    res.json(assigned);
})

// Get assigned list based on request id
const getAssignedByReqId = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const assigned = await AssignedInventories.findOne({ "order._id": id });
    res.json(assigned);
})

const deleteAssigned = asyncHandler(async (req,res) => {
  const id = req.params.id;

  try {
    const deleted = await AssignedInventories.deleteOne({ _id: ObjectId(id) });
    res.json(deleted);
  } catch {
    res.status(400);
  }
})

const editAssigned = asyncHandler(async (req,res) => {
  const id = req.params.id;

  try {
    const edited = await Inventories.updateOne({ _id:ObjectId(id) }, { assign: false })
    res.json(edited)
  } 
  catch {
    res.status(400);
  }
})

const removeAssignedInv = asyncHandler(async (req,res) => {
  const reqId = req.body.reqId;
  const invId = req.body.invId;

  try {
    const deleted = await AssignedInventories.updateOne({ _id: ObjectId(reqId) }, { 
      $pullAll: {
        inventory: [{ _id: ObjectId(invId) }]
      }
     })
     res.json(deleted)
  }
  catch {
    res.status(400);
  }
})

// Delete Inventory
const deleteInventory = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await Inventories.deleteOne({ _id: ObjectId(id) });
    res.json(deleted);
  } catch {
    res.status(400);
  }
});

// Login
const loginUser = asyncHandler(async (req,res) => {
  const {username, password} = req.body;

  try {
    Users.findOne({ username:username, password:password }).then((resp) => {
      res.json(resp)
    }).catch((err) => {
      res.status(400)
    })
  } catch {
    res.status(400);
  }
})

// Register
const register = asyncHandler(async (req,res) => {
  const {username, password, name, type} = req.body;

  const userReg = new Users({
    username: username,
    password: password,
    name: name,
    type: type
  })

  console.log(userReg)

  try {
    user
      .save()
      .then(() => {
        res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch {
    res.status(400);
  }
})

export {
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
};
