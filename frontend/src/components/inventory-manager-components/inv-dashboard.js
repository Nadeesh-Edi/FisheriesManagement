import React from "react";
import "../../res/css/invDashboard.css"
import InvManagerNav from "../../navbars/inv-manager-nav";

export default function Dashboard() {
    function directToInventory() {
        window.location.href = "/allInventory"
    }

    function directToBuyerRequests() {
        window.location.href = "/allBuyerRequests"
    }

    return (
        <>
            <InvManagerNav />
            <div className="dashBack">
                <div>
                    <h1 className="text-center text-white mb-5 pt-5">DASHBOARD</h1>
                </div>
                <div className="dash-btn-set">
                        <div className="row">
                            <div className="col-5">
                                <button className="btn btn-outline-primary px-5 py-5 my-5 shadow-lg p-3 mb-5 bg-white rounded" onClick={directToBuyerRequests}>BUYER REQUESTS</button>
                            </div>
                            <div className="col-2"></div>
                            <div className="col-5">
                                <button className="btn btn-outline-primary px-5 py-5 my-5 shadow-lg p-3 mb-5 bg-white rounded" onClick={directToInventory}>INVENTORY</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <button className="btn btn-outline-primary px-5 py-5 my-5 shadow-lg p-3 mb-5 bg-white rounded">ASSIGNED LIST</button>
                            </div>
                            <div className="col-2"></div>
                            <div className="col-5">
                                <button className="btn btn-outline-primary px-5 py-5 my-5 shadow-lg p-3 mb-5 bg-white rounded">MY PROFILE</button>
                            </div>
                        </div>
                    <br /><br /><br />
                    
                    
                </div>
            </div>
        </>
    )
}