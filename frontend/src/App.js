import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { Route, Switch } from "react-router";

import Dashboard from "./components/inventory-manager-components/inv-dashboard";
import ViewAllInventory from "./components/inventory-manager-components/inv-all-inventory";
import BuyerRequests from "./components/inventory-manager-components/inv-buyer-requests";
import AssignInvForRequest from "./components/inventory-manager-components/assign-inv-for-buyer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/allInventory" element={<ViewAllInventory />} />
        <Route path="/allBuyerRequests" element={<BuyerRequests />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignToBuy" element={<AssignInvForRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
