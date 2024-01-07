import React from "react";
import { useSelector } from "react-redux";
import ProductsContainer from "../components/ProductsContainer";

export default function SearchPage() {
  const { filterProducts } = useSelector((state) => state.user);

 if( filterProducts.length <=0){
  return <h1 className="w-screen h-full text-center text-red-500 text-4xl font-bold ">No products Found</h1>

 }
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-center mt-2 mb-6 font-bold text-3xl">Filtered Products</h1>

      <div className="max-w-screen md:max-w-screen-xl mx-auto h-auto flex flex-wrap justify-around p-4">
        {filterProducts &&
          filterProducts.map((item) => (
            <div key={item.id} className="m-2">
              <ProductsContainer
                brand={item.brand}
                description={item.description}
                discountPercentage={item.discountPercentage}
                image={item.images[0]}
                price={item.price}
                title={item.title}
                id={item.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
