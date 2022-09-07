import React from "react";
import "../../res/css/navbar.css";

export default function InvManagerNav() {
    return (
        <>
            <div className="sidenav">
                <a href="">Home</a>
                <a href="">About Us</a>
                <a href="/allProducts">Products</a>
                <a href="/myorders">My Orders</a>
                <a className="logoutBtn" href="">LOGOUT</a>
            </div>
        </>
    )
}