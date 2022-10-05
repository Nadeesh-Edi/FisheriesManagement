import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../res/css/regboat.css";
import "../../res/css/allboats.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import jspdf from "jspdf";
import "jspdf-autotable";
import img from '../navbars/logo.png';
import BOwnerNav from "../navbars/b.owner.nav";
import PDF from "@material-ui/icons/PictureAsPdfRounded";
import Edit from "@material-ui/icons/EditRounded";
import Delete from "@material-ui/icons/DeleteForeverRounded";

export default function Assignedorders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  const [status, setStatus] = useState("");

  function updateData(e) {
    e.preventDefault();

    const newOrder = {
      status,

    }}

  const deleteOrder = (id) => {
    swal({
      title: "Are you sure?",
      text: "The Order Will be Declined",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:9000/order/deleteOrder/${id}`).then(() => {
          if (willDelete) {
            swal({
              title: "The Order has been declined!",
              text: "You can Continue with Remaining Orders.",
              icon: "success",
              type: "success",
            }).then(function () {
              window.location.href = "";
            });
          } else {
            swal("Order Is Not Declined");
          }
        });
      }
    });
  };

  const generatePDF = (tickets) => {
    const doc = new jspdf();
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    const tableColumn = [
      "Order No",
      "Date",
      "Product",
      "Unit Price",
      "Quantity",
      "Total Price",
      "Status",
      "Buyer Name",
      "Phone No",
      "Email",
      "Address",
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
        ticket.Name,
        ticket.phoneNo,
        ticket.Email,
        ticket.Address,
      ];
      tableRows.push(ticketData);
    });
    doc.text("Assigned Order Details Report", 14, 15).setFontSize(12);
    doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
    doc.addImage(img, 'JPEG', 170, 8, 22, 22);
    // right down width height
    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 8 },
      startY: 35,
    });
    doc.save(`Assigned_Orders_Report.pdf`);
  };

  useEffect(() => {
    function getOrders() {
      axios
        .get("http://localhost:9000/order/showOrders")
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getOrders();
  }, []);

  return (
    <>
      <BOwnerNav />
      <div className="obody">
        <div className="container">
          <div className="pageo">
            <br />
            <br />
            <h1 className="h1o">
              <center> Assigned Orders </center>
            </h1>
            <br />

            <div class="table-wrapper">
              <div class="table-title">
                <div class="row">
                  <div class="col-sm-4">
                    <h2 className="h2o">All Assigned Order Details</h2>
                  </div>
                  <div class="col-sm-8">
                    <a class="btn btn-light" onClick={() => generatePDF(orders)}>
                      <PDF /> Generate PDF
                    </a>
                  </div>
                </div>
              </div>
              <div class="table-filter">
                <div class="row">
                  <div class="col-sm-3">
                    <h5>Pending Order Count : {orders.length}</h5>
                  </div>
                  <div class="col-sm-9">
                    <div class="filter-group">
                      <input
                        class="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(e) => {
                          setsearchTerm(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <br />

              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>
                      <center> Order No </center>
                    </th>
                    <th>
                      <center> Order Date </center>
                    </th>
                    <th>
                      <center> Customer Name </center>
                    </th>
                    <th>
                      <center> Phone Number </center>
                    </th>
                    <th>
                      <center> Product </center>
                    </th>
                    <th>
                      <center> Quantity </center>
                    </th>
                    <th>
                      <center> Total Price </center>
                    </th>
                    <th>
                      <center> Status </center>
                    </th>
                    <th>
                    </th>                    
                    <th>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.date
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        val.product
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) 
                        // val.engineRange
                        //   .toNumbers()
                        //   .includes(searchTerm.toNumbers()) ||
                        // val.qty
                        //   .toLowerCase()
                        //   .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map(function (f) {
                      return (
                        <tr>
                          <td>
                            <center> {f.OrderNo} </center>
                          </td>
                          <td>
                            <center> {f.date} </center>
                          </td>
                          <td>
                            <center> {f.Name} </center>
                          </td>
                          <td>
                            <center> {f.phoneNo} </center>
                          </td>
                          <td>
                            <center> {f.product} </center>
                          </td>
                          <td>
                            <center> {f.qty} </center>
                          </td>
                          <td>
                            <center> {f.total} </center>
                          </td>
                          <td>
                            <center> {f.status} </center>
                          </td>

                          <td onClick={updateData}>
                          <button type="button" class="btn btn-outline-success" onClick={(e) => setStatus(e.target.Accepted)} > Accept </button>
                          </td>
                          <td onClick={updateData}>
                          <button type="button" class="btn btn-outline-danger" onClick={(e) => setStatus(e.target.Declined)} > Decline </button>
                            
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
