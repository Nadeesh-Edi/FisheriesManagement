import Product from '../models/ProductModel.js';
import crypto from 'crypto';
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

const saveProduct=(upload.single("testImage"),(req,res)=>{
    const savePro =  Product({
        ProductName: req.body.ProductName,
        ProductPrice: req.body.ProductPrice,
        ProductImg: {
          data: fs.readFileSync("../uploads/" + req.file.filename),
          contentType: "image/png",
        },
        ProductInfo: req.body.ProductInfo,
      });
      savePro
        .save()
        .then((res) => {
          console.log("Product is saved");
        })
        .catch((err) => {
          console.log(err, "error has occur");
        });
        res.send('Product is saved')
})

const getProduct=(async(req,res)=>{
    Product.find().then((Products)=>{
        res.json(Products);
    }).catch((err)=>{
        console.log(err);
    })
})


export {saveProduct,getProduct};