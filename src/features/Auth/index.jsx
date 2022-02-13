import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function AuthFeature(props) {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />}></Route>
    </Routes>
  );
}

export default AuthFeature;
