import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { Route, Switch } from "react-router";

import Dashboard from "./components/inventorymanagerComponents/inv-dashboard";
import ViewAllInventory from "./components/inventorymanagerComponents/inv-all-inventory";
import BuyerRequests from "./components/inventorymanagerComponents/inv-buyer-requests";
import AssignInvForRequest from "./components/inventorymanagerComponents/assign-inv-for-buyer";

import BODashboard from "./components/boatOwnerComponents/dashboardScreen";
import AllProducts from "./components/OrderManagement/AllProducts";
import ViewProduct from "./components/OrderManagement/ViewProduct";
import BillDetails from "./components/OrderManagement/BillDetails";
import MyOrders from "./components/OrderManagement/MyOrders";
import UpdateOrder from "./components/OrderManagement/UpdateOrder";
import ViewOrder from "./components/OrderManagement/ViewOrder";
import RegisterBoat from "./components/boatOwnerComponents/registerboatScreen";
import AllBoats from "./components/boatOwnerComponents/allboatsScreen";
import BoatDetails from "./components/boatOwnerComponents/viewboatScreen";
import UpdateBoat from "./components/boatOwnerComponents/editboatScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/allInventory" element={<ViewAllInventory />} />
        <Route path="/allBuyerRequests" element={<BuyerRequests />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignToBuy" element={<AssignInvForRequest />} />
        <Route path="/bownerdashboard" element={<BODashboard />} />
        <Route path="/allProducts" element={<AllProducts/>} />
        <Route path="/viewproduct/:id" element={<ViewProduct/>} />
        <Route path="/billproduct" element={<BillDetails/>} />
        <Route path="/myorders" element={<MyOrders/>} />
        <Route path="/updateorder/:id" element={<UpdateOrder/>} />
        <Route path="/vieworder/:id" element={<ViewOrder/>} />
        <Route path="/registerboat" element={<RegisterBoat />} />
        <Route path="/allboats" element={<AllBoats />} />
        <Route path="/boatdetails/:id" element={<BoatDetails />} />
        <Route path="/updateboat/:id" element={<UpdateBoat />} />
      </Routes>
    </Router>
  );
}

export default App;
