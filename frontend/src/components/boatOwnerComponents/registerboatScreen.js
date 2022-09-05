import React, { useState, useEffect } from "react";
import axios from "axios";
import BOwnerNav from "../navbars/b.owner.nav";
import swal from "sweetalert2";
import "../../res/css/regboat.css";

export default function RegisterBoat() {
  const [boatName, setBoatName] = useState("");
  const [boatNo, setBoatNo] = useState();
  const [boatType, setBoatType] = useState("");
  const [length, setLength] = useState("");
  const [depth, setDepth] = useState("");
  const [engineRange, setEngineRange] = useState("");
  const [speed, setSpeed] = useState("");
  const [maxMembers, setMaxMembers] = useState();
  const [fishCapacity, setFishCapacity] = useState("");
  const [fuelCapacity, setFuelCapacity] = useState("");
  const [description, setDescription] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newBoat = {
      boatName,
      boatNo,
      boatType,
      length,
      depth,
      engineRange,
      speed,
      maxMembers,
      fishCapacity,
      fuelCapacity,
      description,
    };

    axios
      .post("http://localhost:9000/api/boats/registerboat", newBoat)
      .then((willReg) => {
        if (willReg) {
          swal({
            title: "Success",
            text: "Boat Successfully Registered",
            icon: "success",
            type: "success",
          }).then(function () {
            window.location.href = "/allboats";
          });
        } else {
          swal("Register Boat Failed!");
        }
      });
  }
  return (
    <>
      <BOwnerNav />
        <div className="container">
          <div className="pageo">
          <form onSubmit={sendData}>
            <br />
            <center>
              <h1 className="h1o">Register Boat</h1>
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
              <label for="boatno">Boat Number</label>
              <input
                type="text"
                class="form-control  border-1 shadow-sm px-4"
                id="boatno"
                placeholder="Enter Boat Number"
                onChange={(e) => {
                  setBoatNo(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="gender">Boat Type</label>
              <select
                type="text"
                class="form-control  border-1 shadow-sm px-4"
                id="boattype"
                onChange={(e) => {
                  setBoatType(e.target.value);
                }}
                required
              >
                <option selected>Select Boat Type</option>
                <option value="Multi-Day">Multi Day Vessel</option>
                <option value="Single-Day">One Day Vessel</option>
                <option value="Small">Small Vessel</option>
              </select>
            </div>
            <br />
            <div class="form-group">
              <div class="row g-3">
                <div class="col">
                  <label for="length">Length</label>
                  <div class="input-group mb-3">
                  <input
                    id="Length"
                    type="text"
                    placeholder="Enter Boat Length"
                    class="form-control  border-1 shadow-sm px-4"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    required
                  />
                                <div class="input-group-append">
                  <span class="input-group-text">m</span>
                </div>
                </div>
                </div>

                <div class="col">
                  <label for="depth">Depth</label>
                  <div class="input-group mb-3">
                  <input
                    id="Depth"
                    type="text"
                    placeholder="Enter Boat Depth"
                    class="form-control  border-1 shadow-sm px-4"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    required
                  />
                                <div class="input-group-append">
                  <span class="input-group-text">m</span>
                </div>
                </div>
              </div>
            </div>
            </div>

            <br />
            <div class="form-group">
              <div class="row g-3">
                <div class="col">
                  <label for="engine Range">Engine Range</label>
                  <div class="input-group mb-3">
                  <input
                    id="Engine Range"
                    type="number"
                    placeholder="Enter Engine Range"
                    class="form-control  border-1 shadow-sm px-4 text-primary"
                    value={engineRange}
                    onChange={(e) => setEngineRange(e.target.value)}
                    required
                  />
                                <div class="input-group-append">
                  <span class="input-group-text">hp</span>
                </div>
                </div>
                </div>

                <div class="col">
                  <label for="speed">Max Speed</label>
                  <div class="input-group mb-3">
                  <input
                    id="Speed"
                    type="text"
                    placeholder="Enter Max Boat Speed"
                    class="form-control  border-1 shadow-sm px-4 text-primary"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    required
                  />
                                <div class="input-group-append">
                  <span class="input-group-text">knots</span>
                </div>
                </div>
                </div>
              </div>
            </div>
            <br />
            <div class="form-group">
              <label for="maxmembers">Max Members</label>
              <input
                type="number"
                class="form-control  border-1 shadow-sm px-4"
                id="maxmembers"
                placeholder="Enter Max Members"
                onChange={(e) => {
                  setMaxMembers(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="fishcapacity">Fish Hold Capacity</label>
              <div class="input-group mb-3">
              <input
                type="number"
                class="form-control border-1 shadow-sm px-4"
                id="fishcapacity"
                placeholder="Enter Fish Hold Capacity"
                onChange={(e) => {
                  setFishCapacity(e.target.value);
                }}
                required
              />
              <div class="input-group-append">
                  <span class="input-group-text">m³</span>
                </div>
            </div>
            </div>
            <br />
            <div class="form-group">
              <label for="fuelcapacity">Fuel Capacity</label>
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control border-1 shadow-sm px-4"
                  id="fuelcapacity"
                  placeholder="Enter Fuel Capacity"
                  onChange={(e) => {
                    setFuelCapacity(e.target.value);
                  }}
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">L</span>
                </div>
              </div>
            </div>
            <br />
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                type="text"
                class="form-control  border-1 shadow-sm px-4"
                id="description"
                placeholder="Enter Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </div>
            <br />

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
            <br />
            <br />
          </form>
        </div>
        </div>
    </>
  );
}
