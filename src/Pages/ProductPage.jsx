import "../CSS/ProductPage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

export default function ProductPage() {
  const [ProductData, setProductData] = useState([]);
  const { ProductId } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  const getProductInfo = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/getSingleProduct/${ProductId}`
      );

      if (response.status === 200) {
        setProductData(response.data?.singleProduct);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [reletdProduct, setRelatedProduct] = useState([]);

  const getRelatedProduct = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/getRelatedProducts/${ProductId}`
      );
      if (response.status === 200) {
        setRelatedProduct(response.data?.Products);
      } else {
        // alert(response.statusText)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProductInfo();
    getRelatedProduct();
  }, [ProductId]);

  const category = ProductData;
  console.log("category", category);

  return (
    <>
      <Layout
        title={"Product Info"}
        para={"all information about a product"}
      ></Layout>

      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white p-6 rounded-lg shadow-md w-full h-full flex items-center justify-around">
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={ProductData.photo}
              alt="Product Image1"
              className="w-[350px] h-[350px] object-contain"
            />
          </div>

          <div className="mt-4 flex flex-col">
            <h1 className="text-2xl font-semibold">{ProductData?.name}</h1>
            <p className="text-lg font-semibold text-blue-600">
              Price: ${ProductData.price}
            </p>
            <p className="text-gray-700">
              Description: {ProductData.description}
            </p>
            <p className="text-gray-700">Category: {category?.name}</p>
            <p className="text-gray-700">Quantity: {ProductData?.quantity}</p>
          </div>

          <div className="mt-4">
            {ProductData.quantity > 0 ? (
              <button className="bg-green-500 text-white px-4 py-2 m-4 rounded-md mr-4">
                In Stock
              </button>
            ) : (
              <button className="bg-red-500 text-white px-4 py-2 m-4 rounded-md mr-4">
                Out of Stock
              </button>
            )}
            <button className="bg-blue-500 text-white px-4 py-2 m-4 rounded-md">
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reletdProduct?.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              photo={item?.photo}
            />
          ))}
        </div>
      </div>
    </>
  );
}
