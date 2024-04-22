// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthControl from "./components/auth/authControl";
import UserDisplay from "./components/userComponents/layout";
import AdminDisplay from "./components/adminComponents/layout";
import TravelForm from "./components/adminComponents/RegisterForm";
import SystemAdminDisplay from "./components/systemAdmin/layout";
import LandingPage from "./components/landingPage";
import RegisterAdmin from "./components/systemAdmin/registerAdmin";
import ChangePassword from "./components/auth/changePassword";
import PrevostX345SeatLayout from "./components/userComponents/BusSeat/seat";

function App() {
  return (
    <div>
      <UserDisplay />
      {/* <Routes>
        <Route path="/" element={<AuthControl />} />
        <Route path="/user" element={<UserDisplay />} />
        <Route path="/admin" element={<AdminDisplay />} />
        <Route path="/register" element={<TravelForm />} />
      </Routes> */}
    </div>
  );
}

export default App;
