import "../CSS/ProductCard.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../Context/UserContext";

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

export default function ProductCard(props) {
  const { cart, Userdispatch } = useContext(UserContext);

  let token = localStorage.getItem("token");
  let UserId = localStorage.getItem("UserId");

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (token !== null) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, []);

  const [count, setCount] = useState(1);

  const handelCount = (e) => {
    setCount(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col  rounded-xl shadow-xl  m-2 bg-white w-full h-full">
        <div className="flex items-center justify-center  flex-col">
          <div className="flex items-start justify-center p-2 w-full mb-2">
          <img src={props.photo} alt={props.photo}  />
          </div>
         <div className="flex items-center text-left  justify-center flex-col w-full">
         <h2 className="font-bold">{props.name}</h2>
          <p className="font-semibold">{props.description}</p>
          <p className="text-red-500 font-bold mb-2">{props.price}</p>
          </div> 
        </div>

        <select className="mb-2 w-1/2 text-center" name="Count" onChange={handelCount}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <div className="flex items-center justify-around">
          <Link to={`/ProductPage/${props.id}`}>
            <button className="bg-black text-white hover:text-red-600 p-2 rounded-md m-2">ViewProduct</button>
          </Link>
          {valid && (
            <button
              className="bg-black text-white hover:text-green-600 p-2 rounded-md m-2"
              onClick={() =>
                {Userdispatch({
                  type: "ADDTOCART",
                  payload: { id: props.id, token, UserId, count },
                })
                notify("added to cart");
              }
              }
            >
              Add To cart
            </button>
          )}
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
