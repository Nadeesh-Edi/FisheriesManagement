import express from 'express';

import { saveFeedback,getComment,updateComment,deleteComment,getOneComment} from '../controllers/FeedbackController.js';
const router=express.Router();

router.post('/saveFeedback',saveFeedback);
router.get('/showFeedbacks',getComment);
router.put('/updateFeedback/:id',updateComment);
router.delete('/deleteFeedback/:id',deleteComment);
router.get('/getOne/:id',getOneComment);


export default router;