import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { Route, Switch } from "react-router";

import Dashboard from "./components/inventorymanagerComponents/inv-dashboard";
import ViewAllInventory from "./components/inventorymanagerComponents/inv-all-inventory";
import BuyerRequests from "./components/inventorymanagerComponents/inv-buyer-requests";
import AssignInvForRequest from "./components/inventorymanagerComponents/assign-inv-for-buyer";

import BODashboard from "./components/boatOwnerComponents/dashboardScreen";
import RegisterBoat from "./components/boatOwnerComponents/registerboatScreen";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/allInventory" element={<ViewAllInventory />} />
        <Route path="/allBuyerRequests" element={<BuyerRequests />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignToBuy" element={<AssignInvForRequest />} />
        <Route path="/bownerdashboard" element={<BODashboard />} />
        <Route path="/registerboat" element={<RegisterBoat />} />
      </Routes>
    </Router>
  );
}

export default App;
