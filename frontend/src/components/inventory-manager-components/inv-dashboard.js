import React from "react";
import "../../res/css/invDashboard.css"
import InvManagerNav from "../../navbars/inv-manager-nav";

export default function Dashboard() {
    return (
        <>
            <InvManagerNav />
            <div className="dashBack">
                <div>
                    <h1 className="text-center text-white mb-5 mt-5">DASHBOARD</h1>
                </div>
                <div className="dash-btn-set">
                        <div className="row">
                            <div className="col-5">
                                <button className="btn btn-outline-primary px-5 py-5 my-5 shadow-lg p-3 mb-5 bg-white rounded">BUYER REQUESTS</button>
                            </div>
                            <div className="col-2"></div>
                            <div className="col-5">
                                <button className="btn btn-outline-primary px-5 py-5 my-5 shadow-lg p-3 mb-5 bg-white rounded">INVENTORY</button>
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