import  mongoose  from 'mongoose'
// import crypto from 'crypto';

// const OrderNo = crypto.randomBytes(16).toString("hex");
const Feedback=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },

})

const feedbackDet=mongoose.model('FeedbackDetail',Feedback);
export default feedbackDet;