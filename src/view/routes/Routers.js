import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Store from "../pages/Store";
import SubmitApp from "../pages/SubmitApp";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import NftDetails from "../pages/NftDetails";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/submit-app" element={<SubmitApp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/market/:id" element={<NftDetails />} />
    </Routes>
  );
};

export default Routers;
