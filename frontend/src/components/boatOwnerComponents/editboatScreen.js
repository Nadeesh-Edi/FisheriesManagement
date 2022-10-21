import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBarWithLayout from "../navbars/navBarWithLayout";
import swal from "sweetalert";
import "../../res/css/regboat.css";

export default function UpdateBoat() {
  const { id } = useParams();

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

  const [boats, setBoat] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/boats/${id}`)
      .then((res) => {
        var boat = res.data;

        setBoat(boat);

        setBoatName(boat.boatName);
        setBoatNo(boat.boatNo);
        setBoatType(boat.boatType);
        setLength(boat.length);
        setDepth(boat.depth);
        setEngineRange(boat.engineRange);
        setSpeed(boat.speed);
        setMaxMembers(boat.maxMembers);
        setFishCapacity(boat.fishCapacity);
        setFuelCapacity(boat.fuelCapacity);
        setDescription(boat.description);
      })
      .catch((e) => {
        console.log(e);
        console.log(id);
      });
  }, []);

  function updateData(e) {
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
      .put(`http://localhost:9000/api/boats/${id}`, newBoat)
      .then((willUpdate) => {
        if (willUpdate) {
          swal({
            title: "Success",
            text: "Boat Details Successfully Updated",
            icon: "success",
            type: "success",
          }).then(function () {
            window.location.href = "/allboats";
          });
        } else {
          swal("Update Boat Details Failed!");
        }
      });
  }

  return (
    <>
      <NavBarWithLayout />
      <div className="obody">
        <div className="container">
          <div className="pageo">
            <form onSubmit={updateData}>
              <br />
              <center>
                <h1 className="h1o">Update Boat Details</h1>
              </center>
              <br />
              <div class="form-group">
                <label for="boatname">Boat Name</label>
                <input
                  type="text"
                  class="form-control  border-1 shadow-sm px-4"
                  id="boatname"
                  defaultValue={boats.boatName}
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
                  defaultValue={boats.boatNo}
                  onChange={(e) => {
                    setBoatNo(e.target.value);
                  }}
                  required
                />
              </div>
              <br />
              <div class="form-group">
                <label for="gender">Boat Type</label>
                <input
                  type="text"
                  class="form-control  border-1 shadow-sm px-4"
                  id="boatType"
                  defaultValue={boats.boatType}
                  onChange={(e) => {
                    setBoatType(e.target.value);
                  }}
                  readOnly
                />
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
                        class="form-control  border-1 shadow-sm px-4"
                        value={length}
                        defaultValue={boats.length}
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
                        class="form-control  border-1 shadow-sm px-4"
                        value={depth}
                        defaultValue={boats.depth}
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
                        class="form-control  border-1 shadow-sm px-4 text-primary"
                        value={engineRange}
                        defaultValue={boats.engineRange}
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
                        class="form-control  border-1 shadow-sm px-4 text-primary"
                        value={speed}
                        defaultValue={boats.speed}
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
                  defaultValue={boats.maxMembers}
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
                    defaultValue={boats.fishCapacity}
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
                    defaultValue={boats.fuelCapacity}
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
                  defaultValue={boats.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                />
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
