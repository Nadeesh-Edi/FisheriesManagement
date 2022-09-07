import React, { useState, useEffect } from "react";
import "../../res/css/OrderManagement.css";
import OrderNav from "../navbars/OrderNav.js";
import "../../res/css/inv-pages.css"
import axios from "axios";

export default function BillDetails() {
    const [product,setProduct]=useState("");
    const [price,setPrice]=useState("");
    const [qty,setQty]=useState("");
    const [total,setTotal]=useState("");
    const [status,setStatus]=useState("");
    const [Name,setName]=useState("");
    const [phoneNo,setPhoneNo]=useState("");
    const [Email,setEmail]=useState("");
    const [Address,setAddress]=useState("");

    function sendData(e){
        e.preventDefault();

        setProduct("Paraw");
        setPrice(3840);
        setQty(1);
        setTotal(3840)
        
        const newOrder={
            product,
            price,
            qty,
            total,
            status,
            Name,
            phoneNo,
            Email,
            Address
        }
        axios.post("http://localhost:9000/order/saveOrder",newOrder).then(()=>{
            alert("Order Added");
        }).catch((err)=>{
            alert(err);
        }).then(()=>{
            window.location.href="/myorders"
        })

    }
    
    return (
        <>
        <OrderNav/>
        <div className="page">
        <div className="bill_view" >
        <div class="row">
  <div class="columnBill" >
  <img class="bill_img" src={require("../../res/images/Fish/fish1.jpeg")} alt=""></img>
  </div>
  <div class="column" >
    <p style={{fontSize:"22px",color:"gray"}}>Product: Thalapath(small) </p>
    <p style={{fontSize:"22px",color:"gray"}}>Price: 2900.00 LKR </p>
    <p style={{fontSize:"22px",color:"gray"}}>Qty: 2Kg</p>
    <p style={{fontSize:"22px",color:"gray"}}>Total: 5800.00 LKR</p>
  </div>
  </div>
  </div>
  <div className="bill_view" style={{marginTop:'0px'}}>
    
    <div class="container">
    <form onSubmit={sendData} style={{fontSize:"20px"}}>

<label >Name</label>
<input className='inputText' type="text" id="fname" name="firstname" placeholder="Your name.." 
onChange={(e)=>{
    setName(e.target.value)
}}></input>

<label >Phone No.</label>
<input className='inputText' type="text" id="phoneNo" name="phoneNo" placeholder="Your Phone No.."
onChange={(e)=>{
    setPhoneNo(e.target.value)
}}></input>

<label >Email</label>
<input className='inputText' type="text" id="email" name="email" placeholder="Your Email.."
onChange={(e)=>{
    setEmail(e.target.value)
}}></input>

<label >Address</label>
<textarea className='inputText' id="address" name="address" placeholder="Write your Address.." style={{height:"100px"}}
onChange={(e)=>{
    setAddress(e.target.value)
}}></textarea>

<input className='inputSubmit' type="submit" value="Confirm Order"></input>

</form>
</div>
  </div>
  </div>
        </>
    )
}