import asyncHandler from "express-async-handler";
import express from "express";
import Inventory from "../models/inventory.model.js";

const router = express.Router();

// Get all inventory
const getInventory = asyncHandler(async (req, res) => {
    const inventory = await Inventory.find({});
    res.json(inventory);
})

const postInventory = asyncHandler(async (req, res) => {
    const {boatId, owner, inventoryDate, fishType, qty} = req.body;

    const inventory = new Inventory({
        boatId, 
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

export { getInventory, postInventory };