import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png"
// import Logo from "../Assets/Logo";
export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("UserId");
    navigate("/login");
    window.location.reload(); // Refresh the page
  };

  const [valid, setValid] = useState(false);
  const [admin, setAdmin] = useState(false);

  let role = localStorage.getItem("role");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null && role !== "1") {
      setValid(true);
    } else {
      setValid(false);
    }

    if (role === "1") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  let UserId = localStorage.getItem("UserId");



  


  return (
    <>
      <div className="flex items-center justify-center border-3 rounded-md w-full p-2.5 h-full">
        <div className=" w-[280px]  pl-4">
          <Link to="/"><img src={logo} alt="logo"  className="h-[60px]"/></Link>
          
        </div>
      <div className="w-full flex items-center justify-center">

      <ul className=" flex items-center justify-around">
          <li className=" m-2 mr-8 hover:text-violet-800 text-gray-500">
            <Link to="/">Home</Link>
          </li>
          <li className=" m-2 mr-8 hover:text-violet-800 text-gray-500  ">
            <Link to="/shop">Shop</Link>
          </li>
          {!UserId && (
            <>
              <li className=" m-2 mr-8 hover:text-violet-800 text-gray-500">
                <Link to="/register">Register</Link>
              </li>
              <li className=" m-2 mr-8 hover:text-violet-800 text-gray-500">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {valid && (
            <>
              

              <li className=" m-2 mr-8 hover:text-violet-800 text-gray-500">
                <Link to={`/CartPage/:${UserId}`}>Cart</Link>
              </li>
              <li className=" m-2 hover:text-violet-800 text-gray-500">
                <Link to="/userProfile">Profile</Link>
              </li>
            </>
          )}

          {admin && (
            <li className=" m-2 mr-4 hover:text-violet-800 font-bold ">
              <Link to="/adminProfile">Admin</Link>
            </li>
          )}
        </ul>

      </div>

      <div className=" flex  items-center justify-center">

       
        {((valid && role === "0") || role === "1") && (
          <div className="flex items-center justify-center  ">
           <button className="  p-[3px]  pl-[12px] pr-[12px] rounded-md border text-center font-semibold text-white bg-violet-800  hover:text-violet-800 hover:bg-white hover:border-2" onClick={handleLogout}>
            Logout
          </button>
         </div>
        )}
        </div>
      </div>
    </>
  );
}
