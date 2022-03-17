import React from "react";
import { useSelector } from "react-redux";
import UserInfo from "../components/UserInfo";

function Detail(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  return <>
  <UserInfo id={loggedInUser?.user?.id}/>
  </>;
}

export default Detail;
