import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import ProductsContainer from '../components/ProductsContainer';
import { useNavigate } from 'react-router-dom';
import { searchProduct } from '../redux/slices/userSlice';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  
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
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [searchValue,setSearchValue]=useState("")

  const handelSearch=async()=>{

  
    const data=await dispatch(searchProduct(searchValue))
notify("searching...")
    if(data?.meta?.requestStatus==="fulfilled"){
      setSearchValue("")
      navigate("/searchPage")
    }

  }

  const getAllProducts = async () => {
    if (user.products.length <= 0) {
      const data = await dispatch(fetchProducts());
    }
  };

 

  useEffect(() => {
    getAllProducts();
   

  }, []);

  
 if( user.products.length <=0){
  return <h1 className="w-screen h-full text-center text-red-500 text-4xl font-bold ">No products Found</h1>

 }

  return (
    <>
      {/* Header */}
      <div className='max-w-screen h-full m-4 flex items-center justify-center'>
      
        <img src="" alt="" />
      </div>

      {/* Search Bar */}
      <div className='w-screen md:max-w-screen-lg mx-auto  shadow-md p-4'>
        <h1 className='font-bold text-4xl text-center text-green-600 border-b-2 mb-4'>Search Your Favorite Products</h1>

        <div className='flex flex-col items-center md:flex-row md:items-stretch md:justify-around'>
          <input
            type="text"
            className="w-full md:w-2/3 lg:w-1/2 border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-2 md:mb-0"
            placeholder="Enter product name..."
            name='searchValue'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
          />

          <button onClick={handelSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Search
          </button>
        </div>
      </div>

      {/* Products */}
      <div className='max-w-screen md:max-w-screen-xl mx-auto h-auto flex flex-wrap justify-around p-4'>
        {user.products &&
          user.products.map((item) => (
            <ProductsContainer
              key={item.id}
              brand={item.brand}
              description={item.description}
              discountPercentage={item.discountPercentage}
              image={item.images[0]}
              price={item.price}
              title={item.title}
              id={item.id}
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
    </>
  );
}
