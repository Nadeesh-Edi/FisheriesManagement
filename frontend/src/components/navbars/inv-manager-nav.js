import React from "react";
import "../../res/css/navbar.css";
import Logo from "../../res/images/logo5.png"

export default function InvManagerNav() {
    return (
        <>
            <div className="sidenav col-lg-3 col-sm-12">
                <img className="rounded mx-auto d-block img-fluid mt-2 w-75 mb-lg-4 pb-lg-2" src={Logo}></img>
                <a className="col-sm-3" href="/dashboard">DASHBOARD</a>
                <a className="col-sm-3" href="/allBuyerRequests">BUYER REQUESTS</a>
                <a className="col-sm-3" href="/allInventory">INVENTORY</a>
                <a className="col-sm-3" href="/allAssigned">ASSIGNED LIST</a>
                <a className="logoutBtn mb-0" href="">LOGOUT</a>
            </div>
        </>
    )
}