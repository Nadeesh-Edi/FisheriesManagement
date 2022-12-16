import  mongoose  from 'mongoose'
// import crypto from 'crypto';

// const OrderNo = crypto.randomBytes(16).toString("hex");
const Product=new mongoose.Schema({
    name: String,
    price:String,
    img: {
      data: Buffer,
      contentType: String,
    },
    info:String
})

const ProductDet=mongoose.model('ProductDetail',Product);
export default ProductDet;