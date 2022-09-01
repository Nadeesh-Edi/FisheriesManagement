import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { Route, Switch } from "react-router";

import Dashboard from "./components/inventory-manager-components/inv-dashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
