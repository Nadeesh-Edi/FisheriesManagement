import asyncHandler from "express-async-handler";
import Boats from "../models/boat.model";

// @desc    Fetch all boats
// @route   GET /api/boats
// @access  Public
const getAllBoats = asyncHandler(async (req, res) => {
  const boats = await Boats.find({});
  res.json(boats);
});

const getBoatsById = asyncHandler(async (req, res) => {
  const boats = await Boats.findById(req.params.id);

  if (boats) {
    res.json({
      _id: boats._id,
      boatName: boats.boatName,
      boatNo: boats.boatNo,
      boatType: boats.boatType,
      length: boats.length,
      depth: boats.depth,
      engineRange: boats.engineRange,
      speed: boats.speed,
      maxMembers: boats.maxMembers,
      fishCapacity: boats.fishCapacity,
      fuelCapacity: boats.fuelCapacity,
      description: boats.description,
    });
  } else {
    res.status(404);
    throw new Error("Boat not found");
  }
});

const boatById = asyncHandler(async (req, res) => {
  const boatid = req.body.boatid;

  try {
    const boats = await Boats.findOne({ _id: req.body.boatid });
    res.json(boats);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

const createBoats = asyncHandler(async (req, res) => {
  const {
    boatName,
    boatNo,
    boatType,
    length,
    depth,
    engineRange,
    speed,
    maxMembers,
    fishCapacity,
    fuelCapacity,
    description,
  } = req.body;

  const newboat = new Boats({
    boatName,
    boatNo,
    boatType,
    length,
    depth,
    engineRange,
    speed,
    maxMembers,
    fishCapacity,
    fuelCapacity,
    description,
  });
  try {
    await newboat.save();
    res.send("New Boat Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const deleteBoat = asyncHandler(async (req, res) => {
  const boats = await Boats.findById(req.params.id);

  if (boats) {
    await boats.remove();
    res.json({ message: "Boat removed" });
  } else {
    res.status(404);
    throw new Error("Boat not found");
  }
});

const updateBoat = asyncHandler(async (req, res) => {
  const {
    boatName,
    boatNo,
    boatType,
    length,
    depth,
    engineRange,
    speed,
    maxMembers,
    fishCapacity,
    fuelCapacity,
    description,
  } = req.body;

  const boats = await Boats.findById(req.params.id);

  if (boats) {
    (boats.boatName = boatName),
      (boats.boatNo = boatNo),
      (boats.boatType = boatType),
      (boats.length = length),
      (boats.depth = depth),
      (boats.engineRange = engineRange),
      (boats.speed = speed),
      (boats.maxMembers = maxMembers),
      (boats.fishCapacity = fishCapacity),
      (boats.fuelCapacity = fuelCapacity),
      (boats.description = description);

    const updateBoat = await boats.save();
    res.json(updateBoat);
  } else {
    res.status(404);
    throw new Error("Boat Not Found");
  }
});


export {
  getAllBoats,
  getBoatsById,
  boatById,
  createBoats,
  deleteBoat,
  updateBoat,
};
