import React from "react";
import { useSelector } from "react-redux";
import ChangePwd from "../components/ChangePwd";

function ChangePasswordPage(props) {
  const loggedInUser = useSelector((state) => state.user.current);

  return <>
  <ChangePwd user={loggedInUser.user}/>
  </>;
}

export default ChangePasswordPage;
