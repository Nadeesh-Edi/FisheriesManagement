import axios from "axios";
import React, { useEffect, useState } from "react";
import {useLocation, useSearchParams} from "react-router-dom"

import InvManagerNav from "../navbars/inv-manager-nav";

export default function AllAssigned() {
    const [allAssigned, setAllAssigned] = useState([]);

    function getAllAssigned() {
        axios.get("http://localhost:9000/api/invManager/getAllAssigned/").then((res) => {
            setAllAssigned(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    
    useEffect(() => {
        getAllAssigned()
    }, [])

    return(
        <>
            <InvManagerNav />
            <div className="page">
                <h1 className="mx-5 text-body mb-5 pt-5">ASSIGNED LIST</h1>
                <br></br>
                <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded fs-5">
                    <form>
                        {/* <input className="rounded-pill ps-2 mx-2 fs-5" type="text" placeholder="Search Boat Id"
                        onChange={(e) => {
                            setBoatId(e.target.value);
                        }}></input>
                        <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Fish Type"
                        onChange={(e) => {
                            setFishType(e.target.value);
                        }}></input>
                        <input className="rounded-pill ps-2 mx-5" type="date" placeholder="Inventory Date"
                        onChange={(e) => {
                            setDate(e.target.value)
                        }}></input>
                        <button type="submit" onClick={filter} className="btn btn-primary rounded mx-5 px-5">FILTER</button> */}
                    </form>
                </div>
                <table className="table table-striped mx-5">
                    <thead>
                        <tr className="table-dark fs-6">
                            <th><center>BOAT OWNER</center></th>
                            <th><center>REQUESTER</center></th>
                            <th><center>TYPE OF FISH</center></th>
                            <th><center>QTY</center></th>
                            <th><center>ASSIGNED DATE</center></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="fs-6">
                        {
                            allAssigned.map(function(f) {
                                return <tr>
                                    <td ><center> {f.inventory.owner} </center></td>
                                    <td ><center> {f.order.Name} </center></td>
                                    <td ><center> {f.inventory.fishType} </center></td>
                                    <td ><center> {f.inventory.qty} </center></td>
                                    <td ><center> {f.createdAt} </center></td>
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