import React from "react";
import { useSelector } from "react-redux";
import UserInfo from "../components/UserInfo";

function Detail(props) {
  const loggedInUser = useSelector((state) => state.user.current);

  return <>
  <UserInfo user={loggedInUser.user}/>
  </>;
}

export default Detail;
