import React, { useState } from 'react';
import {useDispatch} from "react-redux"
import { LoginUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
export default function Login() {

  const notify = (message) =>
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [loginState,setLoginState]=useState({
    username:"",
    password:""
    // hbingley1
    // CQutx25i8r
  })

  const handelChange=(e)=>{
    const {name,value}=e.target
    setLoginState({...loginState,[name]:value})
  }

  const handelLogin=async(e)=>{

    e.preventDefault()
    let data;
    const {username,password}=loginState
if(username && password){

  
   data=await dispatch(LoginUser(loginState))

}else{
  notify("fill the all fields")
}
   if(data?.meta?.requestStatus==="fulfilled"){
   
     setLoginState({
      username:"",
      password:""
    })
    navigate("/")
   }
   

   
  }
  return (
    <div className="w-scrren h-screen flex items-center justify-center bg-gradient-to-r " style={{ backgroundColor: '#080337' }}>
     <form  onSubmit={handelLogin} className='w-full h-full flex items-center justify-center'>
     <div className="bg-white p-10 rounded-md shadow-md w-full md:w-2/3 lg:w-1/3">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Login</h2>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
            
          </label>
          <input
            className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name='username'
            value={loginState.username}
            placeholder="Your username"
            onChange={handelChange}
            required
           
          />
        </div>

       

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name='password'
            value={loginState.password}
            onChange={handelChange}
            placeholder="********"
            required
          />
        </div>

        {/* Login Button */}
        <div className="flex items-center justify-center w-full">
          <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " 
          onClick={handelLogin}
          >
            Sign In
          </button>

          </div>

       
      </div>
     </form>

     <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  );
}
