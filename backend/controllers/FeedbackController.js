import Feedback from '../models/FeedbackModel.js';
import crypto from 'crypto';


const saveFeedback=(async(req,res)=>{
    const {comment}=req.body;
    
    const newComment=new Feedback({comment});
    await newComment.save().then(()=>{
        res.json("Comment Sent");
    }).catch((err)=>{
        console.log(err);
    })
})

const getComment=(async(req,res)=>{
    Feedback.find().then((feedbacks)=>{
        res.json(feedbacks);
    }).catch((err)=>{
        console.log(err);
    })
})

const updateComment=(async(req,res)=>{
    const Cid=req.params.id;
    const {comment}=req.body;

    await Feedback.findByIdAndUpdate(Cid,{comment})
    .then(()=>{
        res.status(200).send({status:"feedback updated"});
    }).catch((err)=>{
        console.log(err);
    })
})
const deleteComment=(async(req,res)=>{
    const Cid=req.params.id;
    await Feedback.findByIdAndDelete(Cid)
    .then(()=>{
        res.json("feedback Canceled");
    }).catch((err)=>{
        console.log(err);
    })
})
const getOneComment=(async(req,res)=>{
    const Cid=req.params.id;
    await Feedback.findById(Cid)
    .then((feedback)=>{
        res.json(feedback);
    }).catch((err)=>{
        console.log(err);
    })
})
export {saveFeedback,getComment,updateComment,deleteComment,getOneComment};