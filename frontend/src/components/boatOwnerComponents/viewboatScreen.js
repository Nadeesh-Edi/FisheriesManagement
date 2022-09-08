import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../res/css/regboat.css";
import { Button } from "@material-ui/core";
import jspdf from "jspdf";
import "jspdf-autotable";
import BOwnerNav from "../navbars/b.owner.nav";

export default function BoatDetails() {
  const { id } = useParams();

  const [boatName, setBoatName] = useState("");
  const [boatNo, setBoatNumber] = useState("");
  const [boatType, setBoatType] = useState("");
  const [length, setLength] = useState("");
  const [depth, setDepth] = useState("");
  const [engineRange, setEngineRange] = useState("");
  const [speed, setSpeed] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [fishCapacity, setFishCapacity] = useState("");
  const [fuelCapacity, setFuelCapacity] = useState("");
  const [description, setDescription] = useState("");

  const [boats, setBoatDetails] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/boats/${id}`)
      .then((res) => {
        var user = res.data;

        setBoatDetails(user);

        setBoatName(user.boatName);
        setBoatNumber(user.boatNo);
        setBoatType(user.boatType);
        setLength(user.length);
        setDepth(user.depth);
        setEngineRange(user.engineRange);
        setSpeed(user.speed);
        setMaxMembers(user.maxMembers);
        setFishCapacity(user.fishCapacity);
        setFuelCapacity(user.fuelCapacity);
        setDescription(user.description);
      })
      .catch((e) => {
        console.log(e);
        console.log(id);
      });
  }, []);

  return (
    <>
      <BOwnerNav />
      <div className="vlft">
      <div className="vcard">
        <br />
        <br />
        
        <h1 className="h1o">
          <center> Boat Details </center>
        </h1>
        <br />
        
        <table className="table table-bordered">
          <table className="table table-hover">
            <thead>
              <tr class="table-primary">
                <th>
                  <center>Specifications</center>
                </th>
                <th>
                  <center>Boat Details</center>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <center> Boat Name </center>
                </td>
                <td>
                  <center> {boats.boatName}</center>
                </td>
              </tr>
              <tr class="table-info">
                <td>
                  <center> Boat Number </center>
                </td>
                <td>
                  <center> {boats.boatNo}</center>
                </td>
              </tr>
              <tr>
                <td>
                  <center> Boat Type </center>
                </td>
                <td>
                  <center> {boats.boatType}</center>
                </td>
              </tr>
              <tr class="table-info">
                <td>
                  <center> Length </center>
                </td>
                <td>
                  <center> {boats.length} m</center>
                </td>
              </tr>
              <tr>
                <td>
                  <center> Depth </center>
                </td>
                <td>
                  <center> {boats.depth} m</center>
                </td>
              </tr>
              <tr class="table-info">
                <td>
                  <center> Engine Range </center>
                </td>
                <td>
                  <center> {boats.engineRange} hp</center>
                </td>
              </tr>
              <tr>
                <td>
                  <center> Max Speed </center>
                </td>
                <td>
                  <center> {boats.speed} knots</center>
                </td>
              </tr>
              <tr class="table-info">
                <td>
                  <center> Max Crew Members </center>
                </td>
                <td>
                  <center> {boats.maxMembers}</center>
                </td>
              </tr>
              <tr>
                <td>
                  <center> Fish Hold Capacity </center>
                </td>
                <td>
                  <center> {boats.fishCapacity} m³</center>
                </td>
              </tr>
              <tr class="table-info">
                <td>
                  <center> Fuel Capacity </center>
                </td>
                <td>
                  <center> {boats.fuelCapacity} L</center>
                </td>
              </tr>
            </tbody>                    
          </table>
        </table>        
        <div class="form-group">
          <label for="type">Description</label>
          <textarea
            type="text"
            class="form-control"
            id="type"
            defaultValue={boats.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            readOnly
          />
        </div>
        <br/><br/>

      </div>
      </div>
    </>
  );
}

