import React from "react";
import "../../res/css/onavbar.css";


export default function BOwnerNav() {
  return (
    <>
<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

<div class="wrapper">
    <div class="sidebar">
        <h2>SEA LINE</h2>
        <ul><br/>
            <li><a href="/bownerdashboard">DASHBOARD</a></li>
            <li><a href="#">PROFILE</a></li>
            <li><a href="/allboats">BOATS</a></li>
            <li><a href="#">INVENTRY</a></li>
            <li><a href="#">ODERS</a></li>
        </ul> 
        <div class="logout">
          <a href="#">Log Out</a>
      </div>
    </div>
</div>
    </>
  );
}
