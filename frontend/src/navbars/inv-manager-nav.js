import React from "react";
import "../res/css/navbar.css";

export default function InvManagerNav() {
    return (
        <>
            <div className="sidenav">
                <a href="">DASHBOARD</a>
                <a href="">BUYER REQUESTS</a>
                <a href="">INVENTORY</a>
                <a href="">ASSIGNED LIST</a>
                <a className="logoutBtn" href="">LOGOUT</a>
            </div>
        </>
    )
}