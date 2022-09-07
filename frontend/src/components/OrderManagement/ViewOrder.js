import React, { useState, useEffect } from "react";
import "../../res/css/OrderManagement.css";
import OrderNav from "../navbars/OrderNav.js";
import "../../res/css/inv-pages.css"
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewOrder() {
    const { id } = useParams();
    const [product,setProduct]=useState("");
    const [price,setPrice]=useState("");
    const [qty,setQty]=useState("");
    const [status,setStatus]=useState("");
    const [Name,setName]=useState("");
    const [phoneNo,setPhoneNo]=useState("");
    const [Email,setEmail]=useState("");
    const [Address,setAddress]=useState("");
    const [orders,setOrder]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:9000/order/getOne/${id}`).then((res)=>{
            var order=res.data;

            setOrder(order);
            
            setProduct(order.product);
            setPrice(order.price);
            setQty(order.qty);
            setStatus(order.status);
            setName(order.Name);
            setPhoneNo(order.phoneNo);
            setEmail(order.Email);
            setAddress(order.Address);
        }).catch((e)=>{
            console.log(e);
            console.log(id)
        })
    },[])


    
    return (
        <>
        <OrderNav/>
        <div className="page">
        <div className="bill_view" >
        <div class="row">
  <div class="columnBill" >
  <img class="bill_img" src={require("../../res/images/Fish/fish1.jpeg")} alt=""></img>
  </div>
  <div class="columnBill" >
    <table>
    <tr style={{fontSize:"22px",color:'blue'}}><td style={{color:"gray",padding:'15px'}}>Product:</td> <td style={{padding:'15px'}}>{orders.product}</td> </tr>
    <tr style={{fontSize:"22px",color:'blue'}}><td style={{color:"gray",padding:'15px'}}>Price:</td> <td style={{padding:'15px'}}>{orders.price}</td> </tr>
    <tr style={{fontSize:"22px",color:'blue'}}><td style={{color:"gray",padding:'15px'}}>Qty:</td> <td style={{padding:'15px'}}>{orders.qty}</td></tr>
    <tr style={{fontSize:"22px",color:'blue'}}><td style={{color:"gray",padding:'15px'}}>Total:</td> <td style={{padding:'15px'}}>{orders.total} LKR</td> </tr>
    <tr style={{fontSize:"22px",color:'blue'}}><td style={{color:"gray",padding:'15px'}}>Name:</td> <td style={{padding:'15px'}}>{orders.Name}</td> </tr>
    <tr style={{fontSize:"22px",color:'blue'}}><td style={{color:"gray",padding:'15px'}}>phoneNo:</td> <td style={{padding:'15px'}}>{orders.phoneNo}</td> </tr>
    <tr style={{fontSize:"22px",color:'blue'}}><td style={{color:"gray",padding:'15px'}}>Email:</td> <td style={{padding:'15px'}}>{orders.Email}</td></tr>
    <tr style={{fontSize:"22px",color:'blue'}}><td style={{color:"gray",padding:'15px'}}>Address:</td> <td style={{padding:'15px'}}> {orders.Address}</td></tr>
    </table>
  </div>
  </div>
  </div>
  
  </div>
        </>
    )
}