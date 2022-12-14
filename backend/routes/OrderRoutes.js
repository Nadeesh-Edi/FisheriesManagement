import express from 'express';

import { saveOrder,getOrders,updateOrder,deleteOrder,getOne, updateStatus} from '../controllers/OrderController.js';
const router=express.Router();

router.post('/saveOrder',saveOrder);
router.get('/showOrders',getOrders);
router.put('/updateOrder/:id',updateOrder);
router.put('/updateStatus/:id',updateStatus);
router.delete('/deleteOrder/:id',deleteOrder);
router.get('/getOne/:id',getOne);


export default router;