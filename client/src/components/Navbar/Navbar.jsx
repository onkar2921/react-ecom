import React, { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCartCount } from "../../redux/slices/userSlice";
import { TiThMenu } from "react-icons/ti";
import { BiLogoSass } from "react-icons/bi";

import { AiOutlineLogin } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
export default function Navbar() {
  const user = useSelector((state) => state.user);
  // console.log("user token",!user.token)
  const dispatch=useDispatch()
//   console.log("user", user);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const handelMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  const getInitialCartCount=async()=>{
    await dispatch(getCartCount())
  }

  useEffect(()=>{
    getInitialCartCount()
  },[])


  const {cartItemCount}=user

  return (
    <>
      {/* for small deviece upto 600 */}
      <nav className="sm:hidden h-full w-screen rounded-xl">
        <div className="flex items-center justify-between w-full h-full p-3 ">
          <div className="ml-[10%]">
            <Link to="/"> <BiLogoSass  className="w-fit h-[40px]" /> </Link>
          </div>

          {/* Navmenu */}

          {openMenu && <NavMenu setOpenMenu={setOpenMenu}></NavMenu>}

          <div className="mr-[10%]">
            <button onClick={handelMenu}><TiThMenu className="w-fit h-[40px]" /></button>
          </div>
        </div>
      </nav>

      {/* for large screens */}
      <nav className="hidden sm:flex shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,55,55,0.2)]  mt-2 h-full w-screen rounded-xl  ">
        <div className="w-full h-full flex items-center justify-evenly">
          <div className="h-[40px]">
            <Link to="/"> <BiLogoSass  className="w-fit h-[40px]"/> </Link>
          </div>
          <div className="   "> 
            <Link to="/cart" className="w-[40px] flex items-center justify-between p-2" onClick={handelMenu} >
           <p className=" text-xl font-bold">Cart </p>
           <p className="p-2  rounded-full text-red-600 bg-black text-center ml-4">{cartItemCount}</p>
            {/* <FaCartPlus className="h-[20px] w-[25px]" />  */}
            </Link>
          </div>
          {/* { user.token===false && (
            <div className=" ">
              <Link to="/login" onClick={handelMenu} className="p-2">
                {/* Login */}
                {/* <AiOutlineLogin className="w-full h-[30px]" />
              </Link>
            </div>
          )}  */}
         
           <button onClick={handelLogout}>
          <LuLogOut className="w-fit h-[40px]" />
            </button>
        </div>
      </nav>
    </>
  );
}
