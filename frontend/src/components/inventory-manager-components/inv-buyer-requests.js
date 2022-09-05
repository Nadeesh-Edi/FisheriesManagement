import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../res/css/inv-pages.css"
import InvManagerNav from "../../navbars/inv-manager-nav";
import {Link, useNavigate,createSearchParams} from "react-router-dom"

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

    function filter(e) {
        e.preventDefault();
        setSearchClick(true);
    }

    function assignToBuy(req) {
        navigate({
            pathname: '/assignToBuy',
            search: createSearchParams({
                id: req._id,
                requester: req.requester,
                fishType: req.fishType,
                qty: req.qty
            }).toString()
        }, { state: {req}});
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
                                <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Request Id"
                                onChange={(e) => {
                                    setRequestId(e.target.value);
                                }}></input>
                            </div>
                            <div className="col-4">
                                <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Fish Type"
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
                        <tr className="table-dark">
                            <th>REQUEST ID</th>
                            <th><center>REQUESTER</center></th>
                            <th><center>TYPE OF FISH</center></th>
                            <th><center>QTY (KG)</center></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.filter(val => {
                                if (!searchClick) {
                                    return val;
                                }
                                else {
                                    if (requestId) {
                                        return val._id.toLowerCase().includes(requestId.toLowerCase())
                                    }
                                    if (fishType) {
                                        return val.fishType.toLowerCase().includes(fishType.toLowerCase())
                                    }
                                }
                            }).map(function(f) {
                                return <tr className="text-start">
                                    <td > {f._id} </td>
                                    <td ><center> {f.requester} </center></td>
                                    <td ><center> {f.fishType} </center></td>
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
                        <button className="btn btn-success rounded">GENERATE REPORT</button>
                    </div>
                </div>
            </div>
        </>
    )
}