import asyncHandler from "express-async-handler";
import express from "express";
import Inventories from "../models/inventory.model.js";
import BuyerRequests from "../models/buyerRequest.model.js";
import {ObjectId} from 'mongodb';
const router = express.Router();

// Get all inventory
const getInventory = asyncHandler(async (req, res) => {
    const inventory = await Inventories.find({});
    res.json(inventory);
})

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
    const requests = await BuyerRequests.find({});
    res.json(requests);
})

// Create Buyer Request
const postBuyerRequest = asyncHandler(async (req,res) => {
    const {requester, fishType, qty} = req.body;

    const buyRequest = new BuyerRequests({
        requester,
        fishType,
        qty
    })

    try {
        buyRequest.save().then(() => {
            res.status(201).json(buyRequest);
        }).catch(err => {
            console.log(err);
        })
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
})

export { getInventory, postInventory, postBuyerRequest, getAllBuyRequests, deleteInventory };