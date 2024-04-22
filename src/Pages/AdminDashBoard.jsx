import "../CSS/AdminDashBoard.css";
import "../CSS/UserDashBoard.css";
import React, { useContext, useEffect } from "react";
import Layout from "../Components/Layout";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

export default function AdminDashBoard() {
  const { name, email, about, role } = useContext(UserContext);
  console.log("name", name);

  return (
    <>
      <Layout title="PROFILE" para="Admin profile"></Layout>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto flex items-center justify-around">
        <div className="w-full items-center justify-center mr-10">
          <h2 className="text-2xl font-bold mb-4 w-full">ADMIN INFORMATION</h2>
          <p className="font-semibold">NAME: {name}</p>
          <p className="font-semibold">EMAIL: {email}</p>
          <p className="font-semibold">ABOUT: {about}</p>
          {role ? (
            <p className="font-semibold">ROLE: ADMIN</p>
          ) : (
            <p className="font-semibold">ROLE: USER</p>
          )}
        </div>

        <div className="mt-6 w-full ">
          <h3 className="text-xl font-bold">Admin Links</h3>
          <Link
            to="/createCategory"
            className="block text-blue-500 font-semibold mb-2 hover:underline"
          >
            Create Category
          </Link>
          <Link
            to="/createProduct"
            className="block text-blue-500 font-semibold mb-2 hover:underline"
          >
            Create Product
          </Link>
          <Link
            to="/orderPage"
            className="block text-blue-500 font-semibold mb-2 hover:underline"
          >
            Orders
          </Link>
          <Link
            to="/updateDelete"
            className="block text-blue-500 font-semibold mb-2 hover:underline"
          >
            Update / Delete
          </Link>
        </div>
      </div>
    </>
  );
}
