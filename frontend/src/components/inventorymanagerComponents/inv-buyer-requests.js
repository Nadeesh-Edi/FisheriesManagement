import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../res/css/inv-pages.css"
import {Link, useNavigate,createSearchParams} from "react-router-dom"
import InvManagerNav from "../navbars/inv-manager-nav";
import jspdf from "jspdf";
import "jspdf-autotable";
import img from "../navbars/logo.png";
import PDF from "@material-ui/icons/PictureAsPdfRounded";

export default function BuyerRequests() {
    const [requests, setRequests] = useState([]);
    const [requestId, setRequestId] = useState("");
    const [fishType, setFishType] = useState("");
    const [searchClick, setSearchClick] = useState(false);

    const navigate = useNavigate()

    async function getRequests() {
        axios.get("http://localhost:9000/api/invManager/getAllBuyReq").then((res) => {
            setRequests(res.data);
        }).catch((err)=>{
            alert((err.message));
        })
    }

    const getFiltersForPDF = () => {
        let inventories = [];
    
        requests.forEach((val) => {
          if (!searchClick) {
            inventories.push(val)
          } else if (
            requestId.length === 0 && fishType.length === 0
          ) {
            inventories.push(val);
          } else if (
            requestId.length !== 0 && fishType.length !== 0
          ) {
              val.OrderNo.toLowerCase().includes(requestId.toLowerCase()) ? inventories.push(val) : doNothing()
              val.product.toLowerCase().includes(fishType.toLowerCase()) ? inventories.push(val) : doNothing()
          } else {
            if (requestId) {
              val.OrderNo.toLowerCase().includes(requestId.toLowerCase()) ? inventories.push(val) : doNothing()
            }
            if (fishType) {
              val.product.toLowerCase().includes(fishType.toLowerCase())? inventories.push(val): doNothing()
            }
          }
        });
    
        return inventories;
      };
    
      function doNothing() {
    
      }

      const generatePDF = () => {
        const pdfInventory = getFiltersForPDF();
    
        const doc = new jspdf();
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        const tableColumn = [
          "Request Id",
          "Requester",
          "Type of fish",
          "Quantity",
        ];
        const tableRows = [];
    
        pdfInventory.map((inv) => {
          const invData = [
            inv.OrderNo,
            inv.Name,
            inv.product,
            inv.qty,
          ];
          tableRows.push(invData);
        });
        doc.text("All Buyer Requests Detailed Report", 14, 15).setFontSize(12);
        doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
        doc.addImage(img, "JPEG", 170, 8, 22, 22);
        // right down width height
        doc.autoTable(tableColumn, tableRows, {
          styles: { fontSize: 8 },
          startY: 35,
        });
        doc.save(`All_Buyer_Requests_Report.pdf`);
      };

    function filter(e) {
        e.preventDefault();
        setSearchClick(true);
    }

    function assignToBuy(req) {
        navigate('/assignToBuy', {
            state: {req}
        });
    }

    useEffect(() => {
        getRequests();
    }, [])

    return (
        <>
            <InvManagerNav />
            <div className="page">
                <h1 className="mx-5 text-body mb-5 pt-5">BUYER REQUESTS</h1>
                <br></br>
                <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded">
                    <form>
                        <div className="row">
                            <div className="col-4">
                                <input className="rounded-pill ps-2 mx-2 fs-5" type="text" placeholder="Search Request Id"
                                onChange={(e) => {
                                    setRequestId(e.target.value);
                                }}></input>
                            </div>
                            <div className="col-4">
                                <input className="rounded-pill ps-2 mx-2 fs-5" type="text" placeholder="Search Fish Type"
                                onChange={(e) => {
                                    setFishType(e.target.value);
                                }}></input>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary rounded mx-5 px-5" onClick={filter}>FILTER</button>
                            </div>
                        </div>
                    </form>
                </div>
                <table className="table table-striped mx-5">
                    <thead>
                        <tr className="table-dark fs-6">
                            <th>REQUEST ID</th>
                            <th><center>REQUESTER</center></th>
                            <th><center>TYPE OF FISH</center></th>
                            <th><center>QTY (KG)</center></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="fs-6">
                        {
                            requests.filter(val => {
                                if (!searchClick) {
                                    return val;
                                }
                                else if(requestId.length === 0 && fishType.length === 0) {
                                    return val;
                                }
                                else if(requestId.length !== 0 && fishType.length !== 0) {
                                    return val.OrderNo.toLowerCase().includes(requestId.toLowerCase()) && val.product.toLowerCase().includes(fishType.toLowerCase())
                                }
                                else {
                                    if (requestId) {
                                        return val.OrderNo.toLowerCase().includes(requestId.toLowerCase())
                                    }
                                    if (fishType) {
                                        return val.product.toLowerCase().includes(fishType.toLowerCase())
                                    }
                                }
                            }).map(function(f) {
                                return <tr className="text-start">
                                    <td > {f.OrderNo} </td>
                                    <td ><center> {f.Name} </center></td>
                                    <td ><center> {f.product} </center></td>
                                    <td ><center> {f.qty} </center></td>
                                    <td>
                                        <button className="purple-btn rounded-pill" onClick={() => {assignToBuy(f)}}>ASSIGN</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className="row justify-content-end">
                    <div className="col-4">
                        <button className="btn btn-success rounded" onClick={() => generatePDF()}>GENERATE REPORT</button>
                    </div>
                </div>
            </div>
        </>
    )
}