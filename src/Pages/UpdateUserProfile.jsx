import React, { useState } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import "../CSS/UpdateUserProfile.css";
// import img3 from "../Assets/img3.jpeg"
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

export default function UpdateUserProfile() {
  let UserId = localStorage.getItem("UserId");

  let token = localStorage.getItem("token");

  const [userData, setUdserData] = useState({
    name: "",
    email: "",
    about: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;

    setUdserData({ ...userData, [name]: value });
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const handelUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${apiUrl}/updateUserProfile/${UserId}`,
        {
          name: userData.name,
          email: userData.email,
          about: userData.email,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // alert("profile updated")
        notify(response.data.message);
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
      <Layout title="Update Profile" para="Free Feel To Do Changes"></Layout>

      <div className={`p-4 rounded-lg shadow-lg bg-white  mx-auto w-full `}>
        <form onSubmit={handelUpdateProfile} className=" space-y-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={handelChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handelChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />

          <textarea
            placeholder="About"
            name="about"
            value={userData.about}
            onChange={handelChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
          <div className="w-full h-full flex items-center justify-center">
            <button
              type="submit"
              className=" bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-[100px]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
