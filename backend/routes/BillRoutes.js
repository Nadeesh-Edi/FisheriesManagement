import express from 'express';

import { saveBill,getAll,getBill,getLastBill} from '../controllers/BillController.js';
const router=express.Router();

router.post('/saveBill',saveBill);
router.get('/show',getAll);
router.get('/getBill/:id',getBill);
router.get('/getLast',getLastBill);

export default router;