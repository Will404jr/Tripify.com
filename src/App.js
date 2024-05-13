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
import Otp from "./components/auth/Otp";
import OtpConfirmation from "./components/auth/OtpConfirmation";
import EditBusDetails from "./components/adminComponents/bus details/editbusDetails";

function App() {
  return (
    <div>
      {/* <UserDisplay /> */}
      <Routes>
        <Route path="/*" element={<UserDisplay />} />
        {/* <Route path="/edit-bus/:id" element={<EditBusDetails />} /> */}
        <Route path="/auth" element={<AuthControl />} />
        <Route path="/sysAdmin/*" element={<SystemAdminDisplay />} />
        <Route path="/admin/*" element={<AdminDisplay />} />
        <Route path="/register" element={<TravelForm />} />
        <Route path="/forgot-password" element={<Otp />} />
        <Route path="/otp-confirmation" element={<OtpConfirmation />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
}

export default App;
