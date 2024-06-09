import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import {
  SignUp,
  PostView,
  LogIn,
  Home,
  About,
  Contact,
  Logout,
  CreateBlog,
  Update
} from "./index.js";
import Header from "./components/Header.jsx";

const PrivateRoutes = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to={"/login"} />
  );
};

function App() {
  const [isUserAuthenticated, setUserAuthentication] = useState(false);
  return (
      <BrowserRouter>
        <Routes path={"/"}>
          <Route
            path="login"
            element={<LogIn setUserAutentication={setUserAuthentication} />}
          />
          <Route
            path="signup"
            element={<SignUp setUserAutentication={setUserAuthentication} />}
          />
          <Route
            path=""
            element={<PrivateRoutes isAuthenticated={isUserAuthenticated} />}
          >
            <Route path="" element={<Home />} />
            <Route path="createBlog" element={<CreateBlog />} />
            <Route path="postview/:id" element = {<PostView/>}/>
            <Route path="update/:id" element={<Update />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="logout" element={<Logout setUserAutentication={setUserAuthentication}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
