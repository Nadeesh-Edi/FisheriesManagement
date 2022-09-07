import  mongoose  from 'mongoose'
// import crypto from 'crypto';

// const OrderNo = crypto.randomBytes(16).toString("hex");
const Order=new mongoose.Schema({
    OrderNo:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    product:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    total:{
        type:Number
    },
    status:{
        type:String,
        default:"Pending"
    },
    Name:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    }

})

const orderDet=mongoose.model('OrderDetail',Order);
export default orderDet;