import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  if (loggedInUser.token) return <Navigate replace to="/" />;

  return <Outlet />;
}
