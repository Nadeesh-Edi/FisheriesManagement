import Order from "../models/OrderModel.js";
import crypto from "crypto";

const saveOrder = async (req, res) => {
  const OrderNo = crypto.randomBytes(4).toString("hex");
  const date = new Date();
  const { product, price, qty, total, status, Name, phoneNo, Email, Address } =
    req.body;

  const newOrder = new Order({
    OrderNo,
    date,
    product,
    price,
    qty,
    total,
    status,
    Name,
    phoneNo,
    Email,
    Address,
  });
  await newOrder
    .save()
    .then(() => {
      res.json("Order Added");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getOrders = async (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOrder = async (req, res) => {
  const Oid = req.params.id;
  const { Name, phoneNo, Email, Address } = req.body;

  await Order.findByIdAndUpdate(Oid, { Name, phoneNo, Email, Address })
    .then(() => {
      res.status(200).send({ status: "Order updated" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateStatus = async (req, res) => {
  const Oid = req.params.id;
  const { status } = req.body;

  await Order.findByIdAndUpdate(Oid, { status })
    .then(() => {
      res.status(200).send({ status: "Order updated" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteOrder = async (req, res) => {
  const Oid = req.params.id;
  await Order.findByIdAndDelete(Oid)
    .then(() => {
      res.json("Order Canceled");
    })
    .catch((err) => {
      console.log(err);
    });
};
const getOne = async (req, res) => {
  const Oid = req.params.id;
  await Order.findById(Oid)
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      console.log(err);
    });
};
export { saveOrder, getOrders, updateOrder, deleteOrder, getOne, updateStatus };
