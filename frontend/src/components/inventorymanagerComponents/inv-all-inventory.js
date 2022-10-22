import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../res/css/inv-pages.css";
import swal from "sweetalert";
import InvManagerNav from "../navbars/inv-manager-nav";
import jspdf from "jspdf";
import "jspdf-autotable";
import img from "../navbars/logo.png";
import PDF from "@material-ui/icons/PictureAsPdfRounded";

export default function ViewAllInventory() {
  const [inventory, setInventory] = useState([]);
  const [boatId, setBoatId] = useState("");
  const [fishType, setFishType] = useState("");
  const [date, setDate] = useState("");
  const [filterClicked, setFilterClicked] = useState(false);

  async function getInventory() {
    axios
      .get("http://localhost:9000/api/invManager/getAllInventory")
      .then((res) => {
        setInventory(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function getDate(date) {
    const fullDate = date.toString().trim().split('T')

    return `${fullDate[0]}`
  }

  const getFiltersForPDF = () => {
    let inventories = [];

    inventory.forEach((val) => {
      if (!filterClicked) {
        inventories.push(val)
      } else if (
        boatId.length === 0 &&
        (fishType.length === 0) & (date.length === 0)
      ) {
        inventories.push(val);
      } else if (
        boatId.length !== 0 &&
        (fishType.length !== 0) & (date.length !== 0)
      ) {
          val.boatId.toLowerCase().includes(boatId.toLowerCase()) ? inventories.push(val) : doNothing()
          val.fishType.toLowerCase().includes(fishType.toLowerCase()) ? inventories.push(val) : doNothing()
          val.inventoryDate.toLowerCase().includes(date.toLowerCase())? inventories.push(val) : doNothing()
      } else {
        if (boatId) {
          val.boatId.toLowerCase().includes(boatId.toLowerCase()) ? inventories.push(val) : doNothing()
        }
        if (fishType) {
          val.fishType.toLowerCase().includes(fishType.toLowerCase())? inventories.push(val): doNothing()
        }
        if (date) {
          val.inventoryDate.toLowerCase().includes(date.toLowerCase())? inventories.push(val) : doNothing()
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
      "Boat Name",
      "Owner",
      "Inventory date",
      "Type of fish",
      "Quantity",
    ];
    const tableRows = [];

    pdfInventory.map((inv) => {
      const invData = [
        inv.boatId,
        inv.owner,
        inv.inventoryDate,
        inv.fishType,
        inv.qty,
      ];
      tableRows.push(invData);
    });
    doc.text("All Inventories Detailed Report", 14, 15).setFontSize(12);
    doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
    doc.addImage(img, "JPEG", 170, 8, 22, 22);
    // right down width height
    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 8 },
      startY: 35,
    });
    doc.save(`All_Inventories_Detailed_Report.pdf`);
  };

  function filter(e) {
    e.preventDefault();
    setFilterClicked(true);
  }

  function deleteInventory(id) {
    swal({
      title: "Are you sure?",
      text: "The Inventory Will be Deleted ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:9000/api/invManager/deleteInv/${id}`)
          .then(() => {
            if (willDelete) {
              swal({
                title: "The Inventory has been Expired!",
                text: "You can Continue.",
                icon: "success",
                type: "success",
              }).then(function () {
                window.location.href = "/allInventory";
              });
            } else {
              swal("Request Is Not Deleted");
            }
          });
      }
    });
  }

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      <InvManagerNav />
      <div className="page">
        <h1 className="mx-5 text-body mb-5 pt-5">INVENTORY</h1>
        <br></br>
        <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded fs-5">
          <form>
            <input
              className="rounded-pill ps-2 mx-2 fs-5"
              type="text"
              placeholder="Search Boat Name"
              onChange={(e) => {
                setBoatId(e.target.value);
              }}
            ></input>
            <input
              className="rounded-pill ps-2 mx-5"
              type="text"
              placeholder="Search Fish Type"
              onChange={(e) => {
                setFishType(e.target.value);
              }}
            ></input>
            <input
              className="rounded-pill ps-2 mx-5"
              type="date"
              placeholder="Inventory Date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
            <button
              type="submit"
              onClick={filter}
              className="btn btn-primary rounded mx-5 px-5"
            >
              FILTER
            </button>
          </form>
        </div>
        <table className="table table-striped mx-5">
          <thead>
            <tr className="table-dark fs-6">
              <th>
                <center>BOAT NAME</center>
              </th>
              <th>
                <center>OWNER NAME</center>
              </th>
              <th>
                <center>INVENTORY DATE</center>
              </th>
              <th>
                <center>TYPE OF FISH</center>
              </th>
              <th>
                <center>QTY</center>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="fs-6">
            {inventory
              .filter((val) => {
                if (!filterClicked) {
                  return val;
                } else if (
                  boatId.length === 0 &&
                  (fishType.length === 0) & (date.length === 0)
                ) {
                  return val;
                } else if (
                  boatId.length !== 0 &&
                  (fishType.length !== 0) & (date.length !== 0)
                ) {
                  return (
                    val.boatName.toLowerCase().includes(boatId.toLowerCase()) &&
                    val.fishType
                      .toLowerCase()
                      .includes(fishType.toLowerCase()) &&
                    val.inventoryDate.toLowerCase().includes(date.toLowerCase())
                  );
                } else {
                  if (boatId) {
                    return val.boatName
                      .toLowerCase()
                      .includes(boatId.toLowerCase());
                  }
                  if (fishType) {
                    return val.fishType
                      .toLowerCase()
                      .includes(fishType.toLowerCase());
                  }
                  if (date) {
                    return val.inventoryDate
                      .toLowerCase()
                      .includes(date.toLowerCase());
                  }
                }
              })
              .map(function (f) {
                return (
                  <tr>
                    <td>
                      <center> {f.boatName} </center>
                    </td>
                    <td>
                      <center> {f.owner} </center>
                    </td>
                    <td>
                      <center> {getDate(f.inventoryDate)} </center>
                    </td>
                    <td>
                      <center> {f.fishType} </center>
                    </td>
                    <td>
                      <center> {f.qty} </center>
                    </td>
                    <td>
                      <center>
                        <button
                          className="btn btn-danger rounded-pill"
                          onClick={() => deleteInventory(f._id)}
                        >
                          EXPIRE
                        </button>
                      </center>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="row justify-content-end">
          <div className="col-4">
            <button className="btn btn-success rounded" onClick={() => generatePDF()}>GENERATE REPORT</button>
          </div>
        </div>
      </div>
    </>
  );
}
