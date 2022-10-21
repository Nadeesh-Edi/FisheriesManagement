import React from "react";
import "../../res/css/onavbar.css";
import logo from '../navbars/logo.png'


export default function BOwnerNav() {
  return (
    <>
<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

<div class="wrapper">
    <div class="sidebar">
    <center><img  src={logo} style={{ width: '170px', height: '170px' }}></img></center>
        <ul><br/>
            <li><a href="/bownerdashboard">DASHBOARD</a></li>
            <li><a href="/allboats">BOATS</a></li>
            <li><a href="/updateinventory">INVENTRY</a></li>
            <li><a href="/assignedorders">ODERS</a></li>
        </ul> 
        <div class="logout">
          <a href="#">Log Out</a>
      </div>
    </div>
</div>
    </>
  );
}
