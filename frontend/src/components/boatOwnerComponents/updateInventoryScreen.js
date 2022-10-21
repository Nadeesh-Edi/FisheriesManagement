import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBarWithLayout from "../navbars/navBarWithLayout";
import swal from "sweetalert";
import "../../res/css/regboat.css";

export default function UpdateInventory() {
  const [boatName, setBoatName] = useState("");
  const [owner, setOwner] = useState();
  const [inventoryDate, setInventoryDate] = useState("");
  const [fishType, setFishType] = useState("");
  const [qty, setQty] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newInventory = {
      boatName,
      owner,
      inventoryDate,
      fishType,
      qty,
    };

    axios
      .post("http://localhost:9000/api/invManager/postInventory", newInventory)
      .then((willAdd) => {
        if (willAdd) {
          swal({
            title: "Success",
            text: "Inventory Successfully Updated",
            icon: "success",
            type: "success",
          }).then(function () {
            window.location.href = "/updateinventory";
          });
        } else {
          swal("Inventory Update Failed!");
        }
      });
  }
  return (
    <>
      <NavBarWithLayout />
      <div className="obody">
        <div className="container">
          <div className="pageo">
            <form onSubmit={sendData}>
              <br />
              <center>
                <h1 className="h1o">Update Fish Inventory</h1>
              </center>
              <br />
              <div class="form-group">
                <label for="boatname">Boat Name</label>
                <input
                  type="text"
                  class="form-control  border-1 shadow-sm px-4"
                  id="boatname"
                  placeholder="Enter Boat Name"
                  onChange={(e) => {
                    setBoatName(e.target.value);
                  }}
                  required
                />
              </div>
              <br />
              <div class="form-group">
                <label for="boatowner">Boat Owner</label>
                <input
                  type="text"
                  class="form-control  border-1 shadow-sm px-4"
                  id="boatowner"
                  placeholder="Enter Boat Owner Name"
                  onChange={(e) => {
                    setOwner(e.target.value);
                  }}
                  required
                />
              </div>
              <br />  
    
              <div class="form-group">
                <label for="inventoryDate">Inventory Date</label>
                <input
                  type="Date"
                  class="form-control  border-1 shadow-sm px-4"
                  id="date"
                  placeholder="Enter Inventory Date"
                  onChange={(e) => {
                    setInventoryDate(e.target.value);
                  }}
                  required
                />
              </div>
              <br />
              <div class="form-group">
                <label for="fishtype">Fish Type</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control border-1 shadow-sm px-4"
                    id="fishtype"
                    placeholder="Enter Fish Type"
                    onChange={(e) => {
                      setFishType(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <br />
              <div class="form-group">
                <label for="quantity">Quantity</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control border-1 shadow-sm px-4"
                    id="quantity"
                    placeholder="Enter Fish Quantity"
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                    required
                  />
                  <div class="input-group-append">
                    <span class="input-group-text">KG</span>
                  </div>
                </div>
              </div>
              <br />

              <button type="submit" class="btn btn-primary">
                Update
              </button>
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
