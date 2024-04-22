import React, { useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";

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

export default function Register() {
  const navigate = useNavigate();

  const [field, setFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...field, [name]: value });
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  const handelRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/Register`, {
        name: field.name,
        email: field.email,
        password: field.password,
      });

      if (response.status === 200) {
        // alert("register sucessfully")
        notify(response.data.message);
        navigate("/login");
        setFields({
          name: "",
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
      <Layout title="Register Page" para="MERN E-COM APP"></Layout>

      <form
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto mt-6"
        onSubmit={handelRegister}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label
            htmlFor="Name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={field.name}
            onChange={handelChange}
            className="w-full px-3 py-2 rounded-md border focus:ring focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
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
          Register
        </button>
      </form>
    </>
  );
}
