import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RideDetails from "./pages/RideDetails";
import CreateRide from "./pages/CreateRide";
import MyRides from "./pages/MyRides";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
       <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ride" element={<RideDetails />} />
        <Route path="/create-ride" element={<CreateRide />} />
        <Route path="/my-rides" element={<MyRides />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;