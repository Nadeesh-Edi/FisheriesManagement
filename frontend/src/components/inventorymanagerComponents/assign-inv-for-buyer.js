import axios from "axios";
import React, { useEffect, useState } from "react";
import {useLocation, useSearchParams} from "react-router-dom"
import { Popover } from 'react-tiny-popover'

import "../../res/css/inv-pages.css"
import AddBtn from "../../res/images/add-icon.png";
import InvManagerNav from "../navbars/inv-manager-nav";
import AssignPopover from "./assign-popover";

export default function AssignInvForRequest() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [assignList, setAssignList] = useState('');
    const [assignInv, setAssignInv] = useState([]);
    const [addedInv, setAddedInv] = useState([]);
    const reqData = useLocation();
    const request = reqData.state.req;

    var dataToSend = {
        addedInv: addedInv,
        product: request.product,
        popFunc: setIsPopoverOpen
    }

    function getAssignedForReq() {
        axios.get(`http://localhost:9000/api/invManager/getAssignedByReq/${request._id}`).then((res) => {
            setAssignList(res.data);
            setAssignInv(res.data.inventory);
        }).catch(err => {
            // alert(err);
        })
    }

    // function deleteInventoryInRequest() {
    //     if(assignInv.length == 1) {
    //         axios.delete(`http://localhost:9000/api/invManager/getAssignedByReq/deleteAssigned/${request._id}`).then((res) => {
            
    //         })
    //     }
    //     else if(assignInv.length ==0 && )
    // }

    function postAssigned() {
        const assign = {
            inventoryList: addedInv,
            order: request
        }
        axios.post('http://localhost:9000/api/invManager/createAssigned', assign).then((res) => {
            window.location.href='/allBuyerRequests'
        }).catch(err => {
            // alert(err)
        })
    }

    function getDate(date) {
        const fullDate = date.toString().trim().split('T')
    
        return `${fullDate[0]}`
      }

    useEffect(() => {
        getAssignedForReq();
    }, [])

    return (
        <>
            <InvManagerNav />
            <div className="page">
                <h1 className="mx-5 text-body mb-5 pt-5">ASSIGN FOR REQUEST</h1>
                <br></br>
                <div className="w-lg-75">
                {
                    isPopoverOpen &&
                        <div className="overlay">
                                <div className="popover">
                                    <AssignPopover name={dataToSend}/>
                                </div>
                        </div>
                }
                </div>
                
                <div className="shadow-lg p-3 mb-5 mx-5 px-3 mb-5 bg-body rounded">
                    <div className="row pb-3">
                        <div className="col-6 fs-5">
                            <div>Request Id:  {request.OrderNo}</div>
                        </div>
                        <div className="col-6 fs-5">
                            <div>Requester: {request.Name}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 fs-5">
                            <div>Type of Fish: {request.product}</div>
                        </div>
                        <div className="col-6 fs-5">
                            <div>Quantity: {request.qty}</div>
                        </div>
                    </div>
                </div>
                {
                    (assignList !== null) &&
                        <div className="my-5">
                            <table className="table table-striped">
                                <thead>
                                    <tr className="table-dark fs-6">
                                        <th><center>OWNER NAME</center></th>
                                        <th><center>INVENTORY DATE</center></th>
                                        <th><center>TYPE OF FISH</center></th>
                                        <th><center>DATE ASSIGNED</center></th>
                                        <th><center>QTY ASSIGNED</center></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="fs-6">
                                        {
                                            assignInv.filter((val) => {
                                                return val;
                                            }).map(function(f) {
                                                return <tr>
                                                    <td ><center> {f.owner} </center></td>
                                                    <td ><center> {getDate(f.inventoryDate)} </center></td>
                                                    <td ><center> {f.fishType} </center></td>
                                                    <td ><center> {assignList.createdAt} </center></td>
                                                    <td ><center> {assignList.order.qty} </center></td>
                                                    <td><center>
                                                        <button className="btn btn-danger rounded-pill" 
                                                            >REMOVE</button>
                                                        </center>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                </tbody>
                            </table>
                        </div>
                }
                {
                    (addedInv.length != 0) &&
                    <div className="my-5">
                    <table className="table table-striped">
                        <thead>
                            <tr className="table-dark fs-6">
                                <th><center>OWNER NAME</center></th>
                                <th><center>INVENTORY DATE</center></th>
                                <th><center>TYPE OF FISH</center></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="fs-6">
                                {
                                    addedInv.filter((val) => {
                                        return val;
                                    }).map(function(f) {
                                        return <tr>
                                            <td ><center> {f.owner} </center></td>
                                            <td ><center> {f.inventoryDate} </center></td>
                                            <td ><center> {f.fishType} </center></td>
                                            <td><center>
                                                <button className="btn btn-danger rounded-pill" 
                                                    >REMOVE</button>
                                                </center>
                                            </td>
                                        </tr>
                                    })
                                }
                        </tbody>
                    </table>
                    <button className="btn btn-success rounded-pill col-3" onClick={() => postAssigned()}>ADD</button>
                </div>
                }
                <div className="text-center">
                    <img src={AddBtn} className="addbtn mt-5" onClick={() => {setIsPopoverOpen(true)}}></img>
                </div>
            </div>
        </>
    )
}