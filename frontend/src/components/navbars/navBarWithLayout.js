import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import BOwnerNav from "./b.owner.nav";

function NavBarWithLayout() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Navbar bg="light" expand="XXL" style={{ padding: 25 }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
        <Navbar.Brand href="#home" style={{ font: "35px bold Arial"  }}>SEALINE</Navbar.Brand>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Body style={{ background: "#295875", width : "25dx" }}>
          <BOwnerNav />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default NavBarWithLayout;
