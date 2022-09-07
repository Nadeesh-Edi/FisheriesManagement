import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../res/css/inv-pages.css"
import swal from "sweetalert";
import InvManagerNav from "../navbars/inv-manager-nav";

export default function ViewAllInventory() {
    const [inventory, setInventory] = useState([]);
    const [boatId, setBoatId] = useState("");
    const [fishType, setFishType] = useState("");
    const [date, setDate] = useState("");
    const [filterClicked, setFilterClicked] = useState(false);

    async function getInventory() {
        axios.get("http://localhost:9000/api/invManager/getAllInventory").then((res) => {
            setInventory(res.data);
        }).catch((err)=>{
            alert((err.message));
        })
    }

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
        })
        .then((willDelete) => {
            if(willDelete) {
                axios.delete(`http://localhost:9000/api/invManager/deleteInv/${id}`).then(()=>{
                    if (willDelete) {
                        swal({
                            title: "The Inventory has been Expired!",
                            text: "You can Continue.",
                            icon:  "success",
                            type: "success"
                        }).then(function(){
                            window.location.href="/allInventory";
                        })
                    } else {
                        swal("Request Is Not Deleted");
                    }
                });
            }
        });
    }

    useEffect(() => {
        getInventory();
    }, [])

    return(
        <>
            <InvManagerNav />
            <div className="page">
                <h1 className="mx-5 text-body mb-5 pt-5">INVENTORY</h1>
                <br></br>
                <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded fs-5">
                    <form>
                        <input className="rounded-pill ps-2 mx-2 fs-5" type="text" placeholder="Search Boat Id"
                        onChange={(e) => {
                            setBoatId(e.target.value);
                        }}></input>
                        <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Fish Type"
                        onChange={(e) => {
                            setFishType(e.target.value);
                        }}></input>
                        <input className="rounded-pill ps-2 mx-5" type="date" placeholder="Inventory Date"
                        onChange={(e) => {
                            setDate(e.target.value.toString)
                        }}></input>
                        <button type="submit" onClick={filter} className="btn btn-primary rounded mx-5 px-5">FILTER</button>
                    </form>
                </div>
                <table className="table table-striped mx-5">
                    <thead>
                        <tr className="table-dark fs-6">
                            <th>INVENTORY ID</th>
                            <th><center>BOAT ID</center></th>
                            <th><center>OWNER NAME</center></th>
                            <th><center>INVENTORY DATE</center></th>
                            <th><center>TYPE OF FISH</center></th>
                            <th><center>QTY</center></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="fs-6">
                        {
                            inventory.filter(val => {
                                if(!filterClicked) {
                                    return val;
                                }
                                else {
                                    if (boatId) {
                                        return val.boatId == boatId
                                    }
                                    if (fishType) {
                                        return val.fishType == fishType
                                    }
                                    if (date) {
                                        return val.date == date
                                    }
                                }
                            }).map(function(f) {
                                return <tr>
                                    <td >{f._id} </td>
                                    <td ><center> {f.boatId} </center></td>
                                    <td ><center> {f.owner} </center></td>
                                    <td ><center> {f.inventoryDate} </center></td>
                                    <td ><center> {f.fishType} </center></td>
                                    <td ><center> {f.qty} </center></td>
                                    <td><center>
                                        <button className="btn btn-danger rounded-pill" onClick={() => deleteInventory(f._id) }>EXPIRE</button></center>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className="row justify-content-end">
                    <div className="col-4">
                        <button className="btn btn-success rounded">GENERATE REPORT</button>
                    </div>
                </div>
            </div>
        </>
    )
}