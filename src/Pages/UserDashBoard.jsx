import "../CSS/UserDashBoard.css";
import React, { useContext } from "react";
import Layout from "../Components/Layout";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

export default function UserDashBoard() {
  const { name, email, about, role } = useContext(UserContext);
  console.log("name", name);

  let UserId = localStorage.getItem("UserId");

  return (
    <>
      <Layout title="PROFILE" para="user profile"></Layout>

      <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Name: {name}</p>
                <p className="text-gray-600">Email: {email}</p>
                <p className="text-gray-600">About: {about}</p>
                {role ? (
                  <p className="text-gray-600">Role: ADMIN</p>
                ) : (
                  <p className="text-gray-600">Role: USER</p>
                )}
              </div>
              <div className="md:text-right">
                <h3 className="text-xl font-semibold mb-2">User Links</h3>
                <Link
                  to={`/cartPage/${UserId}`}
                  className="text-blue-600 hover:underline block mb-2"
                >
                  Cart
                </Link>
                <Link
                  to="/updateProfile"
                  className="text-blue-600 hover:underline"
                >
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
