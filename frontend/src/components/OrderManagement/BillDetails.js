import React, { useState, useEffect } from "react";
import "../../res/css/OrderManagement.css";
import OrderNav from "../navbars/OrderNav.js";
import "../../res/css/inv-pages.css"
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";


export default function BillDetails() {
    const [product,setProduct]=useState("");
    const [price,setPrice]=useState("");
    const [qty,setQty]=useState("");
    const [total,setTotal]=useState("");
    const [status,setStatus]=useState("Pending");
    const [Name,setName]=useState("");
    const [phoneNo,setPhoneNo]=useState("");
    const [Email,setEmail]=useState("");
    const [Address,setAddress]=useState("");
    const [bills,setBill]=useState([]);
    const { id } = useParams();
    const [error,setError]=useState(false)

    useEffect(()=>{
        axios.get("http://localhost:9000/bill/getLast").then((res)=>{
            var bill=res.data;

            setBill(bill);

            setProduct(bill.product);
            setPrice(bill.price);
            setQty(bill.qty);
            setTotal(bill.total)
            
            
        }).catch((e)=>{
            console.log(e);
            console.log(id)
        })
    },[])

    function sendData(e){
        e.preventDefault();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(Name.length==0||phoneNo.length==0||Email.length==0||Address.length==0){
            setError(true)
        }else if(phoneNo.length!==10){
            setError(true)
        }else if(!(Email.match(mailformat))){
            setError(true)
        }
        else{
        
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
        axios.post("http://localhost:9000/order/saveOrder",newOrder)
        .then((willReg) => {
            if (willReg) {
              swal({
                title: "Success",
                text: "Order Successfully Added",
                icon: "success",
                type: "success",
              }).then(function () {
                window.location.href = "/myorders";
              });
            } else {
              swal("Order Failed!");
            }
          });
    }
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
    <p style={{fontSize:"20px",color:"gray"}}>Product: {bills.product} </p>
    <p style={{fontSize:"20px",color:"gray"}}>Price: {bills.price} </p>
    <p style={{fontSize:"20px",color:"gray"}}>Qty: {bills.qty}</p>
    <p style={{fontSize:"20px",color:"gray"}}>Total: {bills.total} LKR</p>
  </div>
  </div>
  </div>
  <div className="bill_view" style={{marginTop:'0px'}}>
    
    <div class="container">
    <form onSubmit={sendData} style={{fontSize:"16px"}}>

<label >Name</label>
<input className='inputText' type="text" id="fname" name="firstname" placeholder="Your name.." 
onChange={(e)=>{
    setName(e.target.value)
}}></input>
{error&&Name.length<=0?
               <p style={{fontSize:"12px",color:"red"}}>*Name Required</p>:""}
<label >Phone No.</label>
<input className='inputText' type="text" id="phoneNo" name="phoneNo" placeholder="Your Phone No.."
onChange={(e)=>{
    setPhoneNo(e.target.value)
}}></input>
{error&&phoneNo.length<=0?
               <p style={{fontSize:"12px",color:"red"}}>*PhoneNo Required</p>:""}
{error&&phoneNo.length!=10?
               <p style={{fontSize:"12px",color:"red"}}>*Invalid PhoneNo</p>:""}

<label >Email</label>
<input className='inputText' type="text" id="email" name="email" placeholder="Your Email.."
onChange={(e)=>{
    setEmail(e.target.value)
}}></input>
{error&&Email.length<=0?
               <p style={{fontSize:"12px",color:"red"}}>*Email Required</p>:""}
{error&&!(Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))?
               <p style={{fontSize:"12px",color:"red"}}>*Invalid Email</p>:""}

<label >Address</label>
<textarea className='inputText' id="address" name="address" placeholder="Write your Address.." style={{height:"100px"}}
onChange={(e)=>{
    setAddress(e.target.value)
}}></textarea>
{error&&Address.length<=0?
               <p style={{fontSize:"12px",color:"red"}}>*Address Required</p>:""}

<input className='inputSubmit' type="submit" value="Confirm Order"></input>

</form>
</div>
  </div>
  </div>
        </>
    )
}