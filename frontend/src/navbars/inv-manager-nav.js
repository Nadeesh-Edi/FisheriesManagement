import React from "react";
import "../res/css/navbar.css";

export default function InvManagerNav() {
    return (
        <>
            <div className="sidenav">
                <a href="/dashboard">DASHBOARD</a>
                <a href="/allBuyerRequests">BUYER REQUESTS</a>
                <a href="/allInventory">INVENTORY</a>
                <a href="">ASSIGNED LIST</a>
                <a className="logoutBtn" href="">LOGOUT</a>
            </div>
        </>
    )
}