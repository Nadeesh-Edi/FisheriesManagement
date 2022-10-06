import Order from '../models/acceptedorders.js';
import crypto from 'crypto';


const acceptOrder=(async(req,res)=>{
    const OrderNo = crypto.randomBytes(4).toString("hex");
    const date=new Date();
    const {product,qty,total,Name,phoneNo,Email,Address}=req.body;
    
    const newOrder=new Order({OrderNo,date,product,qty,total,Name,phoneNo,Email,Address});
    await newOrder.save().then(()=>{
        res.json("Order Accepted");
    }).catch((err)=>{
        console.log(err);
    })
})

const getacceptedOrders=(async(req,res)=>{
    Order.find().then((orders)=>{
        res.json(orders);
    }).catch((err)=>{
        console.log(err);
    })
})

export {acceptOrder,getacceptedOrders};