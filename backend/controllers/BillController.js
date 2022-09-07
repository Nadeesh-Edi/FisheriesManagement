import Bill from '../models/BillModel.js';



const saveBill=(async(req,res)=>{
    const {product,price,qty}=req.body;
    const total=price*qty;
    
    const newBill=new Bill({product,price,qty,total});
    await newBill.save().then(()=>{
        res.json("Billed");
    }).catch((err)=>{
        console.log(err);
    })
})

const getAll=(async(req,res)=>{
    Order.find().then((bills)=>{
        res.json(bills);
    }).catch((err)=>{
        console.log(err);
    })
})


const getBill=(async(req,res)=>{
    const Bid=req.params.id;
    await Bill.findById(Bid)
    .then((bill)=>{
        res.json(bill);
    }).catch((err)=>{
        console.log(err);
    })
})
export {saveBill,getAll,getBill};