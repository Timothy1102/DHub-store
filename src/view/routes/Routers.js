import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Store from "../pages/Store";
import SubmitApp from "../pages/SubmitApp";
import Profile from "../pages/Profile";
import AppDetails from "../pages/AppDetails";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/submit-app" element={<SubmitApp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/store/:id" element={<AppDetails />} />
    </Routes>
  );
};

export default Routers;
