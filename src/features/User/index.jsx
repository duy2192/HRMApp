import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "components/NotFound";
import DetailPage from "./pages/Detail";
import ChangePasswordPage from "./pages/ChangePwd";

function UserFeature(props) {

  return (
    <>
      <Routes>
        <Route path="/information" element={<DetailPage />}></Route>
        <Route path="/changepassword" element={<ChangePasswordPage />}></Route>
        <Route element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default UserFeature;
