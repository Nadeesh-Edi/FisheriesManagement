import React from "react";
import {useLocation, useSearchParams} from "react-router-dom"

import "../../res/css/inv-pages.css"
import InvManagerNav from "../navbars/inv-manager-nav";

export default function AssignInvForRequest() {
    const reqData = useLocation();
    const request = reqData.state.req;

    return (
        <>
            <InvManagerNav />
            <div className="page">
                <h1 className="mx-5 text-body mb-5 pt-5">ASSIGN FOR REQUEST</h1>
                <br></br>
                <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded">
                    <div className="row">
                        <div className="col-6">
                            <div>Request Id:  {request.OrderNo}</div>
                        </div>
                        <div className="col-6">
                            <div>Requester: {request.Name}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div>Type of Fish: {request.product}</div>
                        </div>
                        <div className="col-6">
                            <div>Quantity: {request.qty}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}