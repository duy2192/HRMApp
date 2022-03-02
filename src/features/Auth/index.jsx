import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPwdPage from "./pages/ForgotPwdPage";
import LoginRoute from "components/PrivateRoute/LoginRoute";
import UserInfo from "./pages/UserInfoPage";

function AuthFeature(props) {
  return (
    <Routes>
      <Route element={<LoginRoute />}>
        <Route path="login" element={<LoginPage />}></Route> 
      </Route>
      <Route path="forgot" element={<ForgotPwdPage />}></Route>
      <Route path=":id" element={<UserInfo />}></Route>
    </Routes>
  );
}

export default AuthFeature;
