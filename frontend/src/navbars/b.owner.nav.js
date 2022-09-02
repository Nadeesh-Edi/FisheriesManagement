import React from "react";
import "../res/css/navbar.css";

export default function BOwnerNav() {
  return (
    <>
      <div className="sidenav">
        <a href="/bownerdashboard">DASHBOARD</a>
        <a href="/bownerprofile">PROFILE</a>
        <a href="/allboats">BOATS</a>
        <a href="/inventry">INVENTRY</a>
        <a href="/orders">ODERS</a>
        <a className="logoutBtn" href="">
          LOGOUT
        </a>
      </div>
    </>
  );
}
