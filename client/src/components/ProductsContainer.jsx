
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartToLocal } from '../redux/slices/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductsContainer({
  image,
  title,
  brand,
  description,
  price,
  discountPercentage,
  id
}) {
  const dispatch = useDispatch();
  const location = useLocation();
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

 

  const handleAddToCart = async () => {
   
    const data = await dispatch(addToCartToLocal({id}));
    notify("adding to cart...")
   
  };

  return (
    <>
    <div className="max-w-xs  mx-auto bg-white rounded-md overflow-hidden shadow-md mb-4 border">
      <img className="w-full h-48 object-cover pt-2 sm:h-64" src={image} alt="Product Image" />

      <div className="p-4">
        <h1 className="text-xl font-extrabold mb-2 text-center">{title}</h1>
        <h2 className="text-md mb-2 font-bold">{brand}</h2>
        <p className="text-gray-700 ">{description}</p>
        <h2 className="text-lg font-bold mt-2">Price Rs {price}</h2>
        <h3 className="text-sm text-green-600">Discount {discountPercentage}%</h3>
      </div>

      <div className="flex justify-between items-center p-4">
      {
          location.pathname!=='/cart'&&
<button
onClick={handleAddToCart}
className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
Add To Cart
</button>

      }
        <Link to={`/singleProduct/${id}`} className="text-blue-500 hover:underline">
          <button className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            View More
          </button>
        </Link>
      </div>
      
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