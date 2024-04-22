import "../CSS/Home.css";
import React, { useEffect, useState } from "react";
// import Layout from "../Components/Layout";
import { getProducts } from "../Components/getProducts";
import ProductCard from "../Components/ProductCard";
import img1 from "../Assets/img1.jpeg";
import img2 from "../Assets/img2.jpeg";
// import img3 from "../Assets/img3.jpeg"
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function Home() {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArival, setProductByArival] = useState([]);

  const ProductsBySellRequest = () => {
    getProducts("getProductsList", "sold").then((data) => {
      console.log("data for sold", data);
      setProductBySell(data?.Products);
    });
  };

  const ProductsByArivalRequest = () => {
    getProducts("getProductsList", "createdAt").then((data) => {
      console.log("data", data?.Products);
      setProductByArival(data?.Products);
    });
  };

  useEffect(() => {
    ProductsBySellRequest();
    ProductsByArivalRequest();
  }, []);

  const spanStyle = {
    padding: "40px",
    marginTop: "80px",
    background: "transparent",
    fontSize: "3rem",
    textTransform: "uppercase",
    fontWeight: "700",
    color: "white",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "500px",
    borderRadius: "0.7rem",
  };

  const slideImages = [
    {
      url: img1,
      caption: "Words That Inspires You",
    },
    {
      url: img2,
      caption: "Unleash Your Imagination",
    },
    {
      url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1856&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Words That Inspires You",
    },
  ];
  return (
    <>
      {/* <Layout title="Home Page" para="MERN E-COM APP"></Layout> */}

      <div className="divStyle">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              >
                <span style={spanStyle}>{slideImage.caption}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>

      <div className="flex items-center justify-around flex-col w-full h-full ">
        <h2 className="w-full p-4  text-center font-bold text-[30px]  hover:text-red-500">
          New Arivals
        </h2>
        <div className="flex items-center justify-center flex-wrap w-full h-full ">
          {productByArival?.map((item) => {
            console.log({ photo: item.photo });
            return (
              <>
                <div className="w-ful h-full p-2">
                  <ProductCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    photo={item?.photo}
                  ></ProductCard>
                </div>
              </>
            );
          })}
        </div>

        <h2 className="w-full p-4  text-center font-bold text-[30px]  hover:text-red-500 mt-10 ">
          Products By Sell
        </h2>

        <div className="flex items-center justify-center flex-wrap w-full h-full">
          {productBySell?.map((item) => {
            return (
              <>
                <div className="w-ful h-full p-2">
                  <ProductCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    photo={item?.photo}
                  ></ProductCard>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
