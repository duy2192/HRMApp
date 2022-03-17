import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import { checkToken } from "utils/common";
// import { useEffect,useState } from "react";

export default function PrivateRoute(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  // const [isLogin,setIsLogin]=useState(false)
  // useEffect(()=>{
  //   (async()=>{
  //     setIsLogin(await checkToken(loggedInUser?.token))
  //   })()
  // },[])
  // if (!isLogin) return <Navigate replace to="/user/login" />;
  if (!loggedInUser?.token) return <Navigate replace to="/auth/login" />;

  return <Outlet />;
}
