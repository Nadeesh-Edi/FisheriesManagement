import React, {useState,useEffect} from "react";
import OrderNav from "../navbars/OrderNav.js";
import "../../res/css/inv-pages.css"
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import jspdf from "jspdf";
import "jspdf-autotable";
import img from '../navbars/logo.png';
import View from "@material-ui/icons/VisibilityRounded";
import Edit from "@material-ui/icons/EditRounded";
import Delete from "@material-ui/icons/DeleteForeverRounded";

export default function MyOrders() {

    const [orders,setOrders]=useState([])
    const [orderId,setOrderId]=useState("")
    const [date,setDate]=useState("")
    const [product,setProduct]=useState("")
    const [filterClicked, setFilterClicked] = useState(false);

    const deleteOrder=(id) =>{
       
        swal({
            title: "Are you sure?",
            text: "The Order Will be Cancled ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              axios.delete(`http://localhost:9000/order/deleteOrder/${id}`).then(() => {
                if (willDelete) {
                  swal({
                    title: "The Order has been Cancled!",
                    text: "You can Continue with Remaining Orders.",
                    icon: "success",
                    type: "success",
                  }).then(function () {
                    window.location.href = "/myorders";
                  });
                } else {
                  swal("Request Is Not Cancled");
                }
              });
            }
          });
    
        }
    
        const generatePDF = (tickets) => {
            const doc = new jspdf();
            const date = Date().split(" ");
            const dateStr = date[1] + "-" + date[2] + "-" + date[3];
            const tableColumn = [
              "Order No",
              "Date",
              "Product",
              "Price(Rs)",
              "Quantity",
              "Total Price(Rs)",
              "Status",
            ];
            const tableRows = [];
        
            tickets.map((ticket) => {
              const ticketData = [
                ticket.OrderNo,
                ticket.date,
                ticket.product,
                ticket.price,
                ticket.qty,
                ticket.total,
                ticket.status,
              ];
              tableRows.push(ticketData);
            });
            doc.text("My Orders Details Report", 14, 15).setFontSize(12);
            doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
            doc.addImage(img, 'JPEG', 170, 8, 22, 22);
            // right down width height
            doc.autoTable(tableColumn, tableRows, {
              styles: { fontSize: 8 },
              startY: 35,
            });
            doc.save(`My_Orders_Details_Report.pdf`);
          };

        function filter(e) {
            e.preventDefault();
            setFilterClicked(true);
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
        <div className="pageO">
                <h1 className="mx-5 text-body mb-5 pt-5">My Orders</h1>
                
                <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded fs-5">
                    <form>
                        <input className="rounded-pill ps-2 mx-2 fs-5" type="text" placeholder="Search Order No"
                        onChange={(e) => {
                            setOrderId(e.target.value);
                        }}></input>
                        
                        <input className="rounded-pill ps-2 mx-5" type="date" placeholder="Order Date"
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}></input>
                        <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Product"
                        onChange={(e) => {
                            setProduct(e.target.value);
                        }}></input>
                        <button type="submit" onClick={filter} className="btn btn-primary rounded mx-5 px-5">FILTER</button>
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
                            <th></th>                     
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.filter(val => {
                                if(!filterClicked) {
                                    return val;
                                }
                                else {
                                    if (orderId) {
                                        return val.orderId == orderId
                                    }
                                    if (date) {
                                        return val.date== date
                                    }
                                    if (product) {
                                        return val.product == product
                                    }
                                }
                            }).map(function (f,index){
                                var dateO = new Date(f.date).toLocaleDateString();
                                return <tr key={index}>
                                    <td scope="row">{index+1}</td>
                                    <td >{dateO}</td>
                                    <td >{f.product}</td>
                                    <td >{f.total}.00</td>
                                    <td >{f.status}</td>
                                    <td>
                                        <Link to={"/vieworder/"+f._id}><button className="btn btn-info"><View/></button></Link>
                                        <Link to={"/updateorder/"+f._id}>{
                                            (f.status == "Pending") &&
                                            <button className="btn btn-warning"><Edit/></button>
                                            }</Link>
                                        {
                                            (f.status == "Pending") &&
                                            <button className="btn btn-danger" onClick={() =>  deleteOrder(f._id)}><Delete/></button>
                                            }
                                    </td>

                                </tr>
                            })
                        }
                    </tbody>
                    
                </table>
                <div className="row justify-content-end">
                    <div className="col-4">
                        <button className="btn btn-success rounded" onClick={() => generatePDF(orders)}>GENERATE REPORT</button>
                    </div>
                </div>
            </div>
  
        </>
    )
}