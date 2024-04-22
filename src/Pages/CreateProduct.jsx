import "../CSS/CreateProduct.css";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";

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

const apiUrl = process.env.REACT_APP_API_URL;

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllCategory`);
      if (response.status === 200) {
        // alert("get all categories")
        setCategories(response.data.AllCategory);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    shipping: false,
    qunatity: "",
  });

  const [category, setCategory] = useState("");

  const handelCategory = (e) => {
    setCategory(e.target.value);
  };

  const [photo, setPhoto] = useState(null);
  const handelChange = (e) => {
    const { name, value } = e.target;

    setProductData({ ...productData, [name]: value });
  };

  // console.log("shipping",productData.shipping)

  const handelCreateProduct = async (e) => {
    e.preventDefault();
    let AdminId = localStorage.getItem("UserId");
    let token = localStorage.getItem("token");

    console.log("product data", productData);
    const formdata = new FormData();

    console.log("category", category);
    formdata.append("name", productData.name);
    formdata.append("description", productData.description);
    formdata.append("price", productData.price);
    formdata.append("category", category);

    formdata.append("shipping", productData.shipping);
    formdata.append("quantity", productData.qunatity);

    formdata.append("photo", photo);
    // console.log("photo form data",photo)

    // console.log("from data", formdata);

    const response = await axios.post(
      `${apiUrl}/createProductRoute/${AdminId}`,
      formdata,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (response.status === 200) {
      // alert("product created")
      notify(response.data.message);
    } else {
      notify(response.statusText);
      // alert(response.statusText)
    }
  };

  return (
    <>
      <Layout title="Create Product " para="Ready to Create Product"></Layout>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
        <form onSubmit={handelCreateProduct}>
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={productData.name}
            onChange={handelChange}
            className="w-full py-2 px-4 mb-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Product Description"
            name="description"
            value={productData.description}
            onChange={handelChange}
            className="w-full py-2 px-4 mb-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          <input
            type="number"
            placeholder="Product Price"
            name="price"
            value={productData.price}
            onChange={handelChange}
            className="w-full py-2 px-4 mb-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          <label className="mb-3">
            Categories:
            <select
              name="category"
              value={productData.category}
              onChange={handelCategory}
              className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <input
            type="number"
            placeholder="Product Quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handelChange}
            className="w-full py-2 px-4 mb-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          <label className="mb-3">
            Shipping:
            <input
              type="checkbox"
              name="shipping"
              value={"true"}
              checked={productData.shipping}
              onChange={handelChange}
              className="ml-2"
            />
          </label>

          <label className="mb-3">
            Product Image:
            <input
              type="file"
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="py-2"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Create Product
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
