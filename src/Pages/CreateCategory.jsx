import React, { useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import "../CSS/CreateCategory.css";

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

export default function CreateCategory() {
  const [name, setName] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const handelCreateCategory = async (e) => {
    e.preventDefault();
    let AdminId = localStorage.getItem("UserId");
    let token = localStorage.getItem("token");
    // console.log("hitting")

    const response = await axios.post(
      `${apiUrl}/createCategory/${AdminId}`,
      {
        //data
        name,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      notify(response.data.message);
    } else {
      notify(response.statusText);
    }
  };

  return (
    <>
      <Layout title="Create Category " para="Ready to Create Category"></Layout>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
        <form onSubmit={handelCreateCategory}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Create Category
          </button>
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
    </>
  );
}
