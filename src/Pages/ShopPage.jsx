
import React, { useEffect, useState } from "react";
import axios from "axios";
import { prices } from "../Assets/Prices";
import ProductCard from "../Components/ProductCard";
import { ToastContainer, toast } from "react-toastify";

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
  
export default function ShopPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectPrice, setSelectPrice] = useState(0);
  const [searchProductData, setSearchProductData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllCategory`);
      if (response.status === 200) {
        setCategories(response.data.AllCategory);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchProduct = async () => {
    try {
      const response = await axios.post(`${apiUrl}/ProductsBySearch`, {
        category: selectCategory,
        price: selectPrice,
        search,
      });

      if (response.status === 200) {
        setSearchProductData(response.data?.Products);
        console.log('search  data',response.data)
        if(response.data?.Products?.length<1){

          notify("No Matching Products Found");
        }
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllProducts`);
      if (response.status === 200) {
        setAllProducts(response.data?.Products);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="w-full md:w-1/3 p-4">
          <select
            className="w-full p-2 rounded-md"
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3 p-4">
          <select
            className="w-full p-2 rounded-md"
            value={selectPrice}
            onChange={(e) => setSelectPrice(e.target.value)}
          >
            <option value={0}>All Prices</option>
            {prices.map((item) => (
              <option key={item.id} value={item.arry}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/3 p-4 flex items-center justify-around">
          <input
            className="w-full p-2 rounded-md"
            type="text"
            placeholder="Search Books"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="w-full md:w-1/3 p-4 flex items-center justify-around">
            <button
              className="border-2 p-1.5 pl-6 pr-6 rounded-md border-violet-800"
              onClick={searchProduct}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchProductData.length > 0
          ? searchProductData.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                photo={item.photo}
                description={item.description}
                price={item.price}
              />
            ))
          : allProducts.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                photo={item.photo}
                description={item.description}
                price={item.price}
              />
            ))}
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
  );
}
