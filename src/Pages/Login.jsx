import React, { useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
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

export default function Login() {
  const navigate = useNavigate();

  const [field, setFields] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...field, [name]: value });
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  const handelLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/Login`, {
        email: field.email,
        password: field.password,
      });

      if (response.status === 200) {
        // alert("login sucessfully")
        // console.log(response.data.ValidUser)

        notify(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.ValidUser.role);
        localStorage.setItem("UserId", response.data.ValidUser._id);
        window.location.reload(); // Refresh the page2

        navigate("/");
        setFields({
          email: "",
          password: "",
        });
      } else {
        // alert(response.statusText)
        notify(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Layout title="Login Page" para="MERN E-COM APP"></Layout>

      <form
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto mt-10"
        onSubmit={handelLogin}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            value={field.email}
            onChange={handelChange}
            className="w-full px-3 py-2 rounded-md border focus:ring focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={field.password}
            onChange={handelChange}
            className="w-full px-3 py-2 rounded-md border focus:ring focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </>
  );
}
