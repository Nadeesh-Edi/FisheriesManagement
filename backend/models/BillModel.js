import  mongoose  from 'mongoose'
// import crypto from 'crypto';

// const OrderNo = crypto.randomBytes(16).toString("hex");
const Bill=new mongoose.Schema({
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
        type:Number,
        required:true
    },


})

const billDet=mongoose.model('BillDetail',Bill);
export default billDet;