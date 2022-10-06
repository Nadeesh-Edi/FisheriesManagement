import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../res/css/regboat.css";
import "jspdf-autotable";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import BOwnerNav from "../navbars/b.owner.nav";

export default function ViewOrderDetails() {
  const { id } = useParams();

  const { handleSubmit} = useForm();

  const [OrderNo, setOrderNo] = useState("");
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");
  const [Name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");

  const [orders, setOrderDetails] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:9000/order/getOne/${id}`)
      .then((res) => {
        var user = res.data;

        setOrderDetails(user);

        setOrderNo(user.OrderNo);
        setDate(user.date);
        setProduct(user.product);
        setPrice(user.price);
        setQty(user.qty);
        setTotal(user.total);
        setStatus(user.status);
        setName(user.Name);
        setPhoneNo(user.phoneNo);
        setEmail(user.Email);
        setAddress(user.Address);
      })
      .catch((e) => {
        console.log(e);
        console.log(id);
      });
  }, []);

  function Acceptorder(e){
    //e.preventDefault();
    
    const newAcceptOrder = {

      OrderNo,date,product,qty,total,Name,phoneNo,Email,Address
    }


axios.post("http://localhost:9000/aorder/acceptOrder",newAcceptOrder).then((willaccept)=>{

        if(willaccept){
  axios.delete(`http://localhost:9000/order/deleteOrder/${id}`).then(()=>{
    
  if (willaccept) {
    swal({
      title: "The Order has been Accepted!",
      icon:  "success",
      type: "success"
    }).then(function(){
      window.location.href="/acceptedorders";

     })
  } else {
    swal("Order Is Not Accepted");
  }
});
}
});
    
  }

  return (
    <>
      <BOwnerNav />
      <div className="obody">
        <div className="container">
          <div className="pageo">
        <br />
        <br />
        
        <h1 className="h1o">
          <center> Order Details </center>
        </h1>
        <br />
        
        <table className="table table-bordered">
          <table className="table table-hover">
            <thead>
              <tr class="table-primary">
                <th>
                  <center>Specifications</center>
                </th>
                <th>
                  <center>Order Details</center>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <center> Order No </center>
                </td>
                <td>
                  <center> {orders.OrderNo}</center>
                </td>
              </tr>
              <tr class="table-secondary">
                <td>
                  <center> Order Date </center>
                </td>
                <td>
                  <center> {orders.date}</center>
                </td>
              </tr>
              <tr>
                <td>
                  <center> Product </center>
                </td>
                <td>
                  <center> {orders.product}</center>
                </td>
              </tr>
              <tr class="table-secondary">
                <td>
                  <center> Unit Price </center>
                </td>
                <td>
                  <center> {orders.price} m</center>
                </td>
              </tr>
              <tr>
                <td>
                  <center> Quantity </center>
                </td>
                <td>
                  <center> {orders.qty} </center>
                </td>
              </tr>
              <tr class="table-secondary">
                <td>
                  <center> Total Price </center>
                </td>
                <td>
                  <center> {orders.total} </center>
                </td>
              </tr>
              <tr class="table-secondary">
                <td>
                  <center> Customer Name </center>
                </td>
                <td>
                  <center> {orders.Name}</center>
                </td>
              </tr>
              <tr>
                <td>
                  <center> Customer Phone No </center>
                </td>
                <td>
                  <center> {orders.phoneNo} </center>
                </td>
              </tr>
              <tr class="table-secondary">
                <td>
                  <center> Customer Email </center>
                </td>
                <td>
                  <center> {orders.Email} </center>
                </td>
              </tr>
              <tr class="table-secondary">
                <td>
                  <center> Customer Address </center>
                </td>
                <td>
                  <center> {orders.Address} </center>
                </td>
              </tr>
              
            </tbody>                    
          </table>
        </table>        
    
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <center><button type="submit"  class="btn btn-outline-primary btn-lg" onClick={handleSubmit(() =>  Acceptorder())}>Accept</button></center>
                <center><button type="submit"  class="btn btn-outline-danger btn-lg" >Decline</button></center>
                </div>
        
        <br/><br/>
      </div>
      </div>
      </div>
    </>
  );
}

