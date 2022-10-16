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

    function getDate(date) {
        const fullDate = new Date(date);
        return `${fullDate.getDate()} / ${fullDate.getMonth()} / ${fullDate.getFullYear()}`
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
                                    <td ><center> {
                                        f.inventory.map(element => {
                                          return <center>{element.owner}<br /> </center>
                                        })
                                        } </center></td>
                                    <td ><center> {f.order.Name} </center></td>
                                    <td ><center> {f.order.product} </center></td>
                                    <td ><center> {f.order.qty} </center></td>
                                    <td ><center> {getDate(f.createdAt)} </center></td>
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