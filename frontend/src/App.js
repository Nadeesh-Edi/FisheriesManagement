import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { Route, Switch } from "react-router";

import Dashboard from "./components/inventorymanagerComponents/inv-dashboard";
import ViewAllInventory from "./components/inventorymanagerComponents/inv-all-inventory";
import BuyerRequests from "./components/inventorymanagerComponents/inv-buyer-requests";
import BODashboard from "./components/boatOwnerComponents/dashboardScreen";
import RegisterBoatScreen from "./components/boatOwnerComponents/registerboatScreen";
import AllProducts from "./components/OrderManagement/AllProducts";
import ViewProduct from "./components/OrderManagement/ViewProduct";
import BillDetails from "./components/OrderManagement/BillDetails";
import MyOrders from "./components/OrderManagement/MyOrders";
import UpdateOrder from "./components/OrderManagement/UpdateOrder";
import ViewOrder from "./components/OrderManagement/ViewOrder";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/allInventory" element={<ViewAllInventory />} />
        <Route path="/allBuyerRequests" element={<BuyerRequests />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bownerdashboard" element={<BODashboard />} />
        <Route path="/registerBoat" element={<RegisterBoatScreen />} />
        <Route path="/allProducts" element={<AllProducts/>} />
        <Route path="/viewproduct" element={<ViewProduct/>} />
        <Route path="/billproduct" element={<BillDetails/>} />
        <Route path="/myorders" element={<MyOrders/>} />
        <Route path="/updateorder/:id" element={<UpdateOrder/>} />
        <Route path="/vieworder/:id" element={<ViewOrder/>} />
      </Routes>
    </Router>
  );
}

export default App;
