import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../res/css/regboat.css";
import "../../res/css/allboats.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";
import img from "../navbars/logo.png";
import NavBarWithLayout from "../navbars/navBarWithLayout";
import PDF from "@material-ui/icons/PictureAsPdfRounded";
import View from "@material-ui/icons/VisibilityRounded";

export default function Assignedorders() {
  const [Aorders, setOrders] = useState([]);
  const [Status, setStatus] = useState("");
  const [Product, setProduct] = useState("");
  const [searchClick, setSearchClick] = useState(false);

  const getFiltersForPDF = () => {
    let orders = [];

    Aorders.forEach((val) => {
      if (!searchClick) {
        orders.push(val)
      } else if (
        Product.length === 0 || Status.length === 0
      ) {
        orders.push(val);
      } else if (
        Product.length !== 0 || Status.length !== 0
      ) {
          val.product.toLowerCase().includes(Product.toLowerCase()) ? orders.push(val) : doNothing()
          val.status.toLowerCase().includes(Status.toLowerCase()) ? orders.push(val) : doNothing()
      } else {
        if (Product) {
          val.product.toLowerCase().includes(Product.toLowerCase())? orders.push(val): doNothing()
        }
        if (Status) {
          val.status.toLowerCase().includes(Status.toLowerCase())? orders.push(val): doNothing()
        }
      }
    });

    return orders;
  };

  function doNothing() {
    
  }

  const generatePDF = () => {
    const pdfOrder = getFiltersForPDF();

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
      "Buyer Name",
      "Phone No",
      "Status",
    ];
    const tableRows = [];

    pdfOrder.map((odr) => {
      const odrData = [
        odr.OrderNo,
        odr.date,
        odr.product,
        odr.price,
        odr.qty,
        odr.total,
        odr.Name,
        odr.phoneNo,
        odr.status,
      ];
      tableRows.push(odrData);
    });
    doc.text("Assigned Order Details Report", 14, 15).setFontSize(12);
    doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
    doc.addImage(img, "JPEG", 170, 8, 22, 22);
    // right down width height
    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 8 },
      startY: 35,
    });
    doc.save(`Assigned_Orders_Report.pdf`);
  };

  function filter(e) {
    e.preventDefault();
    setSearchClick(true);
}

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
      <NavBarWithLayout />
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
                    <a
                      class="btn btn-light"
                      onClick={() => generatePDF()}
                    >
                      <PDF /> Generate PDF
                    </a>
                  </div>
                </div>
              </div>
              <div class="table-filter">
                <div class="row">
                  <div class="col-sm-3">
                    
                  </div>
                  <div class="col-sm-9">
                    <div class="filter-group">
                    <div class="input-group">
  <div class="form-outline">
    <input class="form-control mr-sm-2"
                        type="search"
                        placeholder="Product/Status"
                        aria-label="Search"
                        onChange={(e) => {
                          setProduct(e.target.value) || setStatus(e.target.value);
                        }} />
  </div>
  <button type="button" class="btn btn-primary" onClick={filter}>
    Filter
  </button>
  </div>



                      
                    </div>
                  </div>
                </div>
              </div>

              <br />

              <div style={{ overflowX: "auto" }}>
                <table className="table table-hover">
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
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Aorders.filter(val => {
                                if (!searchClick) {
                                    return val;
                                }
                                else if(Product.length === 0 || Status.length === 0) {
                                    return val;
                                }
                                else if(Product.length !== 0 || Status.length !== 0) {
                                    return val.product.toLowerCase().includes(Product.toLowerCase()) || val.status.toLowerCase().includes(Status.toLowerCase())
                                }
                                else {
                                    if (Product) {
                                        return val.product.toLowerCase().includes(Product.toLowerCase())
                                    }
                                    if (Status) {
                                      return val.status.toLowerCase().includes(Status.toLowerCase())
                                  }
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

                          <td>
                            {f.status == "Pending" && (
                              <Link to={"/vieworderdetails/" + f._id}>
                                <Button
                                  type="button"
                                  class="btn btn-outline-secondary"
                                >
                                  <View />
                                </Button>
                              </Link>
                            )}
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
      </div>
    </>
  );
}
