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
import AddIcon from "@material-ui/icons/AddCircleOutline";
import PDF from "@material-ui/icons/PictureAsPdfRounded";
import View from "@material-ui/icons/VisibilityRounded";
import Edit from "@material-ui/icons/EditRounded";
import Delete from "@material-ui/icons/DeleteForeverRounded";

export default function AllBoats() {
  const [boats, setBoats] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  const deleteBoat = (id) => {
    swal({
      title: "Are you sure?",
      text: "The Boat Will be Deleted ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:9000/api/boats/${id}`).then(() => {
          if (willDelete) {
            swal({
              title: "The Boat has been Removed!",
              text: "You can Continue with Remaining Boats.",
              icon: "success",
              type: "success",
            }).then(function () {
              window.location.href = "/allboats";
            });
          } else {
            swal("Request Is Not Deleted");
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
      "Boat Name",
      "Boat No",
      "Boat Type",
      "Length",
      "Depth",
      "Engine Range",
      "Max Speed",
      "Max Crew Members",
      "Fish Hold Capacoty",
      "Fuel Capacity",
    ];
    const tableRows = [];

    tickets.map((ticket) => {
      const ticketData = [
        ticket.boatName,
        ticket.boatNo,
        ticket.boatType,
        ticket.length,
        ticket.depth,
        ticket.engineRange,
        ticket.speed,
        ticket.maxMembers,
        ticket.fishCapacity,
        ticket.fuelCapacity,
      ];
      tableRows.push(ticketData);
    });
    doc.text("All Boat Details Report", 14, 15).setFontSize(12);
    doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
    doc.addImage(img, 'JPEG', 170, 8, 22, 22);
    // right down width height
    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 8 },
      startY: 35,
    });
    doc.save(`All_Boat_Details_Report.pdf`);
  };

  useEffect(() => {
    function getBoats() {
      axios
        .get("http://localhost:9000/api/boats/allboats")
        .then((res) => {
          setBoats(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getBoats();
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
              <center> All Boats </center>
            </h1>
            <br />

            <div class="table-wrapper">
              <div class="table-title">
                <div class="row">
                  <div class="col-sm-4">
                    <h2 className="h2o">All Registered Boat Details</h2>
                  </div>
                  <div class="col-sm-8">
                    <a href="/registerboat" class="btn btn-primary">
                      <AddIcon /> Add New
                    </a>
                    <a class="btn btn-light" onClick={() => generatePDF(boats)}>
                      <PDF /> Generate PDF
                    </a>
                  </div>
                </div>
              </div>
              <div class="table-filter">
                <div class="row">
                  <div class="col-sm-3">
                    <h5>Boat Count : {boats.length}</h5>
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
                      <center> Boat Name </center>
                    </th>
                    <th>
                      <center> Boat Type </center>
                    </th>
                    <th>
                      <center> Engine Range (hp) </center>
                    </th>
                    <th>
                      <center> Fish Hold Capacity (m³) </center>
                    </th>
                    <th>
                      <center> View </center>
                    </th>
                    <th>
                      <center> Edit </center>
                    </th>
                    <th>
                      <center> Delete </center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {boats
                    .filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.boatName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        val.boatType
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        // val.engineRange
                        //   .toNumbers()
                        //   .includes(searchTerm.toNumbers()) ||
                        val.fishCapacity
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map(function (f) {
                      return (
                        <tr>
                          <td>
                            <center> {f.boatName} </center>
                          </td>
                          <td>
                            <center> {f.boatType} </center>
                          </td>
                          <td>
                            <center> {f.engineRange} </center>
                          </td>
                          <td>
                            <center> {f.fishCapacity} </center>
                          </td>

                          <td>
                            {" "}
                            <Link to={"/boatdetails/" + f._id}>
                              <Button
                                type="button"
                                class="btn btn-outline-secondary"
                              >
                                {" "}
                                <View />{" "}
                              </Button>
                            </Link>
                          </td>
                          <td>
                            {" "}
                            <Link to={"/updateboat/" + f._id}>
                              <Button
                                type="button"
                                class="btn btn-outline-primary"
                              >
                                {" "}
                                <Edit />{" "}
                              </Button>
                            </Link>
                          </td>
                          <td>
                            {" "}
                            <Button
                              type="button"
                              class="btn btn-outline-danger"
                              onClick={() => deleteBoat(f._id)}
                            >
                              {" "}
                              <Delete />{" "}
                            </Button>
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
