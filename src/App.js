import { Route, Routes } from "react-router-dom";
import AuthFeature from "./features/Auth";
import NotFound from "components/NotFound";
import Home from "Layouts/Home";
import PrivateRoute from "components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<Home />} />
        </Route>
        <Route path="/auth/*" element={<AuthFeature />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}


export default App;
