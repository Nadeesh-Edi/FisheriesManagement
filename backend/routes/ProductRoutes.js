import express from 'express';
import  mongoose  from 'mongoose'
import ProductModel from '../models/ProductModel.js'
import multer from 'multer';
import fs from 'fs'
const router=express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../backend/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  router.post("/save", upload.single("testImage"), (req, res) => {
    const saveImage =  ProductModel({
      name: req.body.name,
      price: req.body.price,
      img: {
        data: fs.readFileSync("../backend/uploads/" + req.file.filename),
        contentType: "image/jpeg",
      },
      info:req.body.info
    });
    saveImage
      .save()
      .then((res) => {
        console.log("image is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
      res.send('image is saved')
  });
  
  
  router.get('/getAll',async (req,res)=>{
    const allData = await ProductModel.find()
    res.json(allData)
  })

  router.get("/getOne/:id",async (req,res)=>{
    try {
      const { id: id } = req.params;
      console.log(id);
      if (!mongoose.Types.ObjectId.isValid(id)) 
          return res.status(404).json({ msg: `No task with id :${id}` 
      });
      const product = await ProductModel.findById({ _id: id });
      res.json(product);
     } catch (error) {
      console.log(error);
     }
})




export default router;