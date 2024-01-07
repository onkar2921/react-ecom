import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";
import { getUserInfo } from "../redux/slices/userSlice";
import { addToCart } from "../redux/slices/userSlice";
import ProductsContainer from "../components/ProductsContainer";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

export default function Cart() {

  
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
  const user = useSelector((state) => state.user);
  // console.log("user",user.userCart)
  const getUserCartData = async () => {
    const data = await dispatch(getCart());
  };

  const getUserDetails = async () => {
    const data = await dispatch(getUserInfo());
  };

  const perFormAddTocart=async()=>{
    
    // if(user.productsAddToCart.length>0){
      await dispatch(addToCart())
      notify("adding...")
    // }
  }

  useEffect(() => {
    getUserCartData();
    getUserDetails();
   
  }, []);

  
  return (
    <>

   <div className="w-screen h-full mt-4 flex flex-col items-center justify-center">
   <p className="text-red-500 text-2xl ml-4 sm:ml-0">This is server data which is dummy </p>
    <h1 className="text-xl"><strong>Total Price  Rs </strong>{user.userCart?.total}</h1>
    <p className="text-xl"><strong>Total Products </strong> {user.userCart?.totalProducts}</p>
    
   </div>
  <div className="w-screen h-full flex items-center justify-center">
        
  <button className=" h-full text-center mt-2 rounded-md bg-green-500 p-1" onClick={ perFormAddTocart}>Confirm Add To Cart</button>
   
    </div> 
     <div className="max-w-screen h-full flex items-center justify-center mt-4">
        <ProfileCard
          firstName={user.userProfileData?.firstName}
          lastName={user.userProfileData?.lastName}
          image={user.userProfileData?.image}
          birthDate={user.userProfileData?.birthDate}
          email={user.userProfileData?.email}
          address={user.userProfileData?.address?.address}
          phone={user.userProfileData?.phone}
          university={user.userProfileData?.university}
          username={user.userProfileData?.username}
          city={user.userProfileData?.address?.city}
        />
      </div>


      <div className="max-w-screen h-full flex items-center justify-center">
          <h1 className="text-2xl text-blue-600  font-bold w-full p-2 text-center">Your cart</h1>
      </div>

      <div className="w-screen h-full flex flex-wrap items-center justify-center">
        {user.userCart && user.userCart?.products?.map((item)=>{
        //  console.log("item",item)
         return(
          <ProductsContainer
          key={item?.id}
          brand={item.brand}
          description={item.description}
          discountPercentage={item.discountPercentage}
          image={item.thumbnail}
          price={item.price}
          title={item.title}
          id={item.id}
        />

          )
        })}


        {
          user.userCart?.products.length<=0 &&   <h1 className="w-screen h-full text-center text-red-500 text-4xl font-bold ">No products Found</h1>
        }
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
