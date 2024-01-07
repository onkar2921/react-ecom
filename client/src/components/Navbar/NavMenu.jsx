import React from 'react';
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogin } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
export default function NavMenu({ setOpenMenu }) {
  const user=useSelector((state)=>state.user)
  // console.log("userState",user)
  const handleLinks = () => {
    // Handle links
    setOpenMenu(false)
  };

  const navigate=useNavigate()

  const handelLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
}
  return (
    <div className='absolute top-10 right-[60px] h-[200px] w-[200px] rounded-xl p-2    transition ease-in-out duration-[3s] text-gray-400/100 ' style={{ backgroundColor: '#080337' }}>
      {/* <button onClick={() => setOpenMenu(false)}>Close Menu</button> */}
       <div className=' p-4 flex items-start justify-evenly flex-col'>
         <Link to="/cart" onClick={handleLinks}  className='p-2 text-xl'>Cart</Link>
      {/* { user&& !user.token&&
       <Link to="/login" onClick={handleLinks} className='p-2'><AiOutlineLogin /></Link>
     }  */}
     { user&& 
        <LuLogOut className='w-[40px] h-[40px] ml-1  '   onClick={handelLogout}/>
      //  <button onClick={handelLogout} className='w-full h-[40px] p-2 '>
      // Logout
      //  </button>
       }
       </div>
    </div>
  );
}
