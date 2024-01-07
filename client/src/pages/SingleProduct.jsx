import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../redux/slices/userSlice';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';


const SingleProduct = () => {

  
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
  const dispatch = useDispatch();
  const product = useSelector((state) => state.user.currentProduct);
  const { productId } = useParams();

  useEffect(() => {
    const getProductInfo = async () => {
      await dispatch(getSingleProduct(productId));
    };

    getProductInfo();
  }, [dispatch, productId]);

  if (!product) {
    return <div className="text-center mt-8">{notify("Loading....")}</div>;
  }

  const { title, brand, description, discountPercentage, images, price, rating, stock, thumbnail } = product;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-md mt-8 border border-gray-300 ">
      <div className="flex justify-center mb-4 ">
        <img src={thumbnail} alt={title} className=" w-64 h-64 object-cover rounded-md shadow-md border border-blue-500" />
      </div>

      <h1 className="text-3xl font-bold mb-2 text-blue-800 text-center">{title}</h1>
      <h2 className="text-lg mb-2 font-bold text-black">{brand}</h2>

      <p className="text-gray-700 mb-4">{description}</p>

      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Price Rs {price}</h2>
        <span className="text-lg text-green-600 ml-2">({discountPercentage}% off)</span>
      </div>

      <div className="w-full h-full flex items-center justify-between flex-wrap ">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product ${index + 1}`}
            className="w-fit h-40 m-4 object-cover rounded-md shadow-md border "
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
};

export default SingleProduct;
