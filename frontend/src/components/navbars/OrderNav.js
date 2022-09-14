import React from "react";
import "../../res/css/navbar.css";
import "../../res/css/OrderManagement.css";

export default function InvManagerNav() {
    return (
        <>
            <div className="sidenav">
                <img className="rounded mx-auto d-block img-fluid mt-2 w-75 mb-lg-4 pb-lg-2" src={require("../../res/images/logo5.png")} alt="logo"></img>
                <a href="">Home</a>
                <a href="">About Us</a>
                <a href="/allProducts">Products</a>
                <a href="/myorders">My Orders</a>
                <a className="logoutBtn mb-0" href="">LOGOUT</a>
            </div>
        </>
    )
}