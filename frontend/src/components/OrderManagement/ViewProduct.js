import React, { useState, useEffect } from "react";
import "../../res/css/OrderManagement.css";
import OrderNav from "../navbars/OrderNav.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ViewProduct() {

  const { id } = useParams();
  const [products,setProducts]=useState([])

  const [product,setProduct]=useState("");
  const [price,setPrice]=useState("");
  const [qty,setQty]=useState("");
  const [total,setTotal]=useState("");

  useEffect(()=>{
      axios.get(`http://localhost:9000/product/getOne/${id}`).then((res)=>{
          var product=res.data;

          setProducts(product);
          
          setProduct(product.name);
          setPrice(product.price);

      }).catch((e)=>{
          console.log(e);
          console.log(id)
      })
  },[])

  function sendData(e){
    e.preventDefault();
    const newBill={
      product,
      price,
      qty,
      total
  }
  axios.post("http://localhost:9000/bill/saveBill",newBill).then(()=>{
    window.location.href="/billproduct"
  }).catch((err)=>{
      alert(err);
  })
}

    return (
        <>
        <OrderNav/>
        <div className="pageO">
        <div class="row">
  <div class="column" style={{paddingTop:'50px'}}>
  <img class="img_view" src={require("../../res/images/Fish/fish1.jpeg")} alt=""></img>
  </div>
  <div class="column" style={{paddingTop:'80px'}}>
    <p style={{fontSize:'24px'}}>{products.name}</p>
    <p style={{fontSize:'18px'}}>per 1kg</p>
    <p style={{color:'red',fontSize:'22px'}}>{products.price}</p>
    <form onSubmit={sendData}>
        <label style={{fontSize:'20px'}}>Quantity:</label>&nbsp;
        <input style={{width:'40px'}} 
        onChange={(e)=>{
            setQty(e.target.value)
         }}></input>
        <label style={{fontSize:'20px'}}>Kg </label><br></br><br></br>
        <button type="submit" class="btn btn-primary">
            Order Now
          </button>
    </form>
  </div>
  </div>
  <br></br>
  <div>
    <h3>Info</h3>
    <p style={{fontSize:'18px',color:'#808080'}}>{products.info}</p>
  </div>
  </div>
        </>
    )
}