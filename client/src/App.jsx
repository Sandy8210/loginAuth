import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import DashBoard from "./pages/DashBoard";
import Profile from "./Auth/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
