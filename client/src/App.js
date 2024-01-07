import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProtectedRoutes from "./components/ProtectectedRoutesComp/ProtectedRoutes";
import Navbar from "./components/Navbar/Navbar";
import SingleProduct from "./pages/SingleProduct";
import SearchPage from "./pages/SearchPage";
function App() {
  const location = useLocation();

  // Function to check if the current route is "signup" or "login"
  const isSignupOrLogin = () => {
    return location.pathname === "/signup" || location.pathname === "/login";
  };

  return (
    <>
      {!isSignupOrLogin() && <Navbar />}
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        ></Route>

<Route
          path="/singleProduct/:productId"
          element={
            <ProtectedRoutes>
              <SingleProduct />
            </ProtectedRoutes>
          }
        ></Route>

        <Route path="/searchPage" element={
          <ProtectedRoutes>
            <SearchPage/>
          </ProtectedRoutes>
        }></Route>

        
      </Routes>
    </>
  );
}

export default App;
