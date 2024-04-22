import React, { useState } from "react";
import axios from "axios";
import Layout from "../Components/Layout";
import { useEffect } from "react";
import "../CSS/OrderPage.css";

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

export default function OrderPage() {
  let token = localStorage.getItem("token");
  let AdminId = localStorage.getItem("UserId");

  const [order, setOrder] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getOrders/${AdminId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log("orders---", response.data.AllOrders);
      if (response.status === 200) {
        setOrder(response.data.AllOrders);
      } else {
        // alert(response.statusText)
        notify(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [statusValue, setStatusValue] = useState([]);

  const getStatus = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getStatus/${AdminId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      // console.log("orders---", response.data.AllOrders);
      if (response.status === 200) {
        // console.log(response.data)
        setStatusValue(response.data);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllOrders();
    getStatus();
  }, []);

  const handelOrderStatus = async (OrderId, status) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/updateStatus/${AdminId}`,
        { OrderId, status },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        // console.log(response.data)
        notify(response.data.message);
        // getStatus();
        getAllOrders();
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
      <Layout title="Order Page" para="See All Orders"></Layout>

      <div className="w-full h-full">
        <h2 className="text-4xl  w-full text-center font-semibold mb-4 shadow-2xl">
          Order Count: {order.length}
        </h2>
        <div className="w-full h-full flex items-center justify-around flex-wrap">
          {order.map((item) => {
            const date = new Date(item.createdAt).toString();
            return (
              <div
                key={item._id}
                className="bg-white p-4 md:p-6 lg:p-8 rounded-md shadow-lg mb-6 "
              >
                <h3 className="text-lg font-semibold mb-2">
                  Order ID: {item._id}
                </h3>
                <p className="text-gray-600">Status: {item.status}</p>
                <select
                  name="Status"
                  onChange={(e) => handelOrderStatus(item._id, e.target.value)}
                  className="w-full py-2 px-4 mt-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Update status</option>
                  {statusValue.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <p className="text-gray-600">
                  Transaction Id: {item.transactionId}
                </p>
                <p className="text-red-600 font-semibold">
                  Amount: {item.amount}
                </p>
                <p>Order By: {item.user.name}</p>
                <p>Ordered On: {date}</p>
                <p>Deliverd Address: {item.address}</p>
                <h3 className="text-lg font-semibold mt-2">
                  Total Products in Order: {item.products.length}
                </h3>
              </div>
            );
          })}
        </div>
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
