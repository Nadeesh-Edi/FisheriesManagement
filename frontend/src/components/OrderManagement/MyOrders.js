import React, {useState,useEffect} from "react";
import OrderNav from "../navbars/OrderNav.js";
import "../../res/css/inv-pages.css"
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert2';

export default function MyOrders() {

    const [orders,setOrders]=useState([])

    const deleteOrder=(id) =>{
       
            axios.delete(`http://localhost:9000/order/deleteOrder/${id}`).then(()=>{
                alert("Order Canceled");
            }).catch((err)=>{
                alert(err);
            }).then(()=>{
                window.location.href="/myorders"
            })
    
        }

    useEffect(()=>{
        function getorders(){
            axios.get("http://localhost:9000/order//showOrders").then((res)=>{
                setOrders(res.data);
            }).catch((err)=>{
                alert((err.message));
            })
        }
        getorders();
    },[])
    

    return (
        <>
        <OrderNav/>
        <div className="page">
                <h1 className="mx-5 text-body mb-5 pt-5">My Orders</h1>
                <br></br>
                <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded">
                    <form>
                        <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Order No"></input>
                        
                        <input className="rounded-pill ps-2 mx-5" type="date" placeholder="Order Date"></input>
                        <button type="submit" className="btn btn-primary rounded mx-5 px-5">FILTER</button>
                    </form>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr className="table-dark">
                            <th>Order No</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Price(Rs)</th>
                            <th>Status</th>                       
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(function (f,index){
                                var dateO = new Date(f.date).toLocaleDateString();
                                return <tr key={index}>
                                    <td scope="row">{index+1}</td>
                                    <td >{dateO}</td>
                                    <td >{f.product}</td>
                                    <td >{f.total}</td>
                                    <td >{f.status}</td>
                                    <td>
                                        <Link to={"/vieworder/"+f._id}><button style={{marginRight:'5px'}} className="btn btn-info">View</button></Link>
                                        <Link to={"/updateorder/"+f._id}><button style={{marginRight:'5px'}} className="btn btn-warning">Update</button></Link>
                                        <button className="btn btn-danger" onClick={() =>  deleteOrder(f._id)}>Cancel</button>
                                    </td>

                                </tr>
                            })
                        }
                    </tbody>
                    
                </table>
                <div className="row justify-content-end">
                    <div className="col-4">
                        <button className="btn btn-success rounded">GENERATE REPORT</button>
                    </div>
                </div>
            </div>
  
        </>
    )
}