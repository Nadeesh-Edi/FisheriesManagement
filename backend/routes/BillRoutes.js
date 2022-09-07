import express from 'express';

import { saveBill,getAll,getBill} from '../controllers/BillController.js';
const router=express.Router();

router.post('/saveBill',saveBill);
router.get('/show',getAll);
router.get('/getBill/:id',getBill);


export default router;