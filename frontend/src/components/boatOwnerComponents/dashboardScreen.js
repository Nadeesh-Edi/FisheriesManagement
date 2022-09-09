import React from "react";
import "../../res/css/b.ownerDashboard.css";

export default function BODashboard() {

  return (
    <>
      <section class="hero">
        <header id="header">
          <a id="logo" href="#">
            logo
          </a>
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
      <article>
        <center>
        <h2>ABOUT US</h2></center>
        <p>
          The rest of the page content continues below the hero. You can use the
          hero at the top of your page, e.g. the home page. A hero is great to
          display a high quality picture together with tasty title.
        </p>
        <p>
          Ad donec tincidunt torquent ultricies convallis sodales faucibus
          magna, fringilla lorem blandit sollicitudin donec faucibus curae orci
          molestie, et proin curae aliquet venenatis ligula amet vivamus orci
          varius arcu.
        </p>
        <p>
          Laoreet fusce condimentum venenatis quisque imperdiet ornare cras
          faucibus convallis, pharetra habitasse elementum ut bibendum per
          sociosqu phasellus etiam, velit faucibus integer torquent leo
          elementum maecenas netus.
        </p>
      </article>
    </>
  );
}
