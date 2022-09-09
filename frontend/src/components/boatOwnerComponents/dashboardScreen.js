import React from "react";
import "../../res/css/b.ownerDashboard.css";
import logo from '../navbars/logo.png'

export default function BODashboard() {

  return (
    <>
      <section class="hero">
        <header id="header">
        <img  src={logo} style={{ width: '150px', height: '150px' }}></img>
          <nav>
            <a id="pageheader">BOAT OWNER DASHBOARD</a>
          </nav>
        </header>
        <header class="hero-header">
          <h1 class="hero-title">SEA LINE</h1>
          <h4>Sri Lanka's one and only Fisheries Management Website.</h4>
        </header>
        <footer class="hero-footer">
          <a class="button button-primary" href="">
            PROFILE
          </a>
          <a class="button" href="/allboats">
            BOATS
          </a>
          <a class="button button-primary" href="">
            INVENTRY
          </a>
          <a class="button" href="">
            ORDERS
          </a>
        </footer>
      </section>
    </>
  );
}
