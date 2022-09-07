import React, { useState, useEffect } from "react";
import "../../res/css/OrderManagement.css";
import OrderNav from "../navbars/OrderNav.js";
import "../../res/css/inv-pages.css"
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateOrder() {
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

    function updateOrder(e){
        e.preventDefault();

        const editOrder={
            Name,
            phoneNo,
            Email,
            Address
        };
        axios.put(`http://localhost:9000/order/updateOrder/${id}`,editOrder).then(()=>{
            alert("Successfully Updated");
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
    <p style={{fontSize:"22px",color:"gray"}}>Product: {orders.product} </p>
    <p style={{fontSize:"22px",color:"gray"}}>Price: {orders.price} </p>
    <p style={{fontSize:"22px",color:"gray"}}>Qty: {orders.qty}</p>
    <p style={{fontSize:"22px",color:"gray"}}>Total: {orders.total}</p>
  </div>
  </div>
  </div>
  <div className="bill_view" style={{marginTop:'0px'}}>
    
    <div class="container">
    <form onSubmit={updateOrder}>

<label >Name</label>
<input className='inputText' type="text" id="fname" name="firstname" placeholder="Your name.." 
defaultValue={orders.Name}
onChange={(e)=>{
    setName(e.target.value)
}}></input>

<label >Phone No.</label>
<input className='inputText' type="text" id="phoneNo" name="phoneNo" placeholder="Your Phone No.."
defaultValue={orders.phoneNo}
onChange={(e)=>{
    setPhoneNo(e.target.value)
}}></input>

<label >Email</label>
<input className='inputText' type="text" id="email" name="email" placeholder="Your Email.."
defaultValue={orders.Email}
onChange={(e)=>{
    setEmail(e.target.value)
}}></input>

<label >Address</label>
<textarea className='inputText' id="address" name="address" placeholder="Write your Address.." style={{height:"100px"}}
defaultValue={orders.Address}
onChange={(e)=>{
    setAddress(e.target.value)
}}></textarea>

<input className='inputSubmit' type="submit" value="Update Order"></input>

</form>
</div>
  </div>
  </div>
        </>
    )
}