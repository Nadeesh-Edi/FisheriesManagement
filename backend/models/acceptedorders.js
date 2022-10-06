import  mongoose  from 'mongoose'
// import crypto from 'crypto';

// const OrderNo = crypto.randomBytes(16).toString("hex");
const AcceptedOrder=new mongoose.Schema({
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
    qty:{
        type:Number,
        required:true
    },
    total:{
        type:Number
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

const acceptedorderDet=mongoose.model('AcceptedOrderDetail',AcceptedOrder);
export default acceptedorderDet;