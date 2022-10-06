import express from 'express';

import { acceptOrder,getacceptedOrders} from '../controllers/acceptedOrderController.js';
const router=express.Router();

router.post('/acceptOrder',acceptOrder);
router.get('/showacceptedOrders',getacceptedOrders);


export default router;