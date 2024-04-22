import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CartCard from "../Components/CartCard";
import { UserContext } from "../Context/UserContext";
import { BrainTreeContext } from "../Context/BrainTreeContext";
import DropIn from "braintree-web-drop-in-react";
import "../CSS/CartPage.css";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const notify = (message) => toast(message);

export default function CartPage() {
  const navigate = useNavigate();

  const [instance, setInstance] = useState("");

  const { clientToken } = useContext(BrainTreeContext);

  const UserId = localStorage.getItem("UserId");

  let token = localStorage.getItem("token");

  const { cart, Userdispatch } = useContext(UserContext);
  console.log("cart", cart);
  const apiUrl = process.env.REACT_APP_API_URL;

  const getCartData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getUserCart/${UserId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        // console.log("return data", response.data.UserCart.userCart);
        // notify(response.data.message)
        Userdispatch({
          type: "CARTDATA",
          payload: response.data.UserCart.userCart,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log("cart data",state.cart)
  let sum = 0;
  const TotalPrice = () => {
    cart?.map((item) => {
      return (sum += item?.ProductId.price * item?.count);
    });
  };

  useEffect(() => {
    getCartData();
  }, [UserId]);

  TotalPrice();

  // useEffect(()=>{
  // // refresh when change in count of product
  // },[cart])

  const [paymentDrop, setPaymentDrop] = useState(false);
  const handelPayment = () => {
    alert("payment hitting");

    setPaymentDrop(true);
    console.log("payment drop", paymentDrop);
  };

  const handelOrder = async () => {
    let ProccedOrder = false;
    try {
      // /braintree/payments

      const { nonce } = await instance.requestPaymentMethod();
      const response = await axios.post(
        `${apiUrl}/braintree/payments/${UserId}`,
        {
          amount: sum,
          paymentMethodNonce: nonce,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        console.log("Response of order", response.data);
        alert(response.data.message);
        ProccedOrder = true;
        setPaymentDrop(false);
        console.log(cart);
        Userdispatch({ type: "MAKECARTEMPTY" });
        console.log(cart);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }

    try {
      if (ProccedOrder) {
        const response = await axios.post(
          `${apiUrl}/createOrder/${UserId}`,
          {
            Products: cart,
            amount: sum,
            address: "at post kalwadi",
            transactionId: "123456789",
          },
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          console.log("response of order", response.data);
          alert(response.data.message);
          // window.location.reload();
        } else {
          alert(response.statusText);
        }
      } else {
        alert("failed in payment");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center p-10">
        <h1 className="flex w-full h-full items-start font-bold text-center text-4xl border-b ">
          Shopping Cart
        </h1>
      </div>

      <div className=" p-4 md:p-8 lg:p-12 flex items-center justify-around flex-col ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Total Price: Rs {sum}
        </h2>

        <div className="drop-div mt-4">
          {paymentDrop && (
            <DropIn
              options={{ authorization: clientToken }}
              onInstance={(instance) => setInstance(instance)}
            />
          )}
        </div>

        <div className="Order-Options flex space-x-4 mt-4">
          {!paymentDrop && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white  py-1 px-6 rounded-md"
              onClick={handelPayment}
            >
              Payment
            </button>
          )}

          <button
            className="bg-green-500 hover:bg-green-600 text-white py-1  px-6 rounded-md"
            onClick={handelOrder}
          >
            Order
          </button>
        </div>

        {cart?.length > 0 ? (
          <div className="flex w-full h-full  items-center justify-around flex-wrap ">
            {cart?.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 md:p-6 lg:p-8 rounded-md shadow-xl mb-4 md:mb-6 lg:mb-8  flex items-center justify-center  w-[30%] "
              >
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4  ">
                  <div className="w-32 h-32 md:w-48 md:h-48 overflow-hidden rounded-md">
                    <img
                      src={item?.ProductId?.photo}
                      alt={item?.ProductId?.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex-1 space-y-2 md:space-y-0">
                    <h3 className="text-lg md:text-xl font-semibold">
                      {item?.ProductId?.name}
                    </h3>
                    <p className="text-gray-600">
                      {item?.ProductId?.description}
                    </p>
                    <p className="text-gray-600">Quantity: {item?.count}</p>
                    <p className="text-red-600 font-semibold">
                      Price: Rs{item?.ProductId?.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center  mb-[220px]">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold shadow-2xl p-4 rounded-lg ">
              Your cart is empty
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
