import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  userProfileData:null,
  token: "",
  products:[],
  cartItemCount:0,
  filterProducts:[],
  productsAddToCart:[],
  currentProduct:"",
  userCart:null,
  loading: true,
  error: false,
};

const uri = process.env.REACT_APP_BACKEND_URI;
const storedUser = localStorage.getItem("user");
const userId = JSON.parse(storedUser)?.id;
var token = localStorage.getItem("token");
console.log("userId",userId)

const LoginUser = createAsyncThunk("LoginUser", async (body) => {
  const { username, password } = body;
  const response = await fetch(`https://dummyjson.com/auth/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return response.json();
});

// getting user info
const getUserInfo = createAsyncThunk("getUserInfo", async (email) => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response.json();
});




const getSingleProduct = createAsyncThunk("getSingleProduct", async (productId) => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
  
    return response.json();
  });

const fetchProducts = createAsyncThunk("fetchProducts", async (email) => {
  const response = await fetch(`https://dummyjson.com/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  return response.json();
});

// get user orders

const addToCart = createAsyncThunk("addToCart", async () => {
  console.log("hey")
  let products=await JSON.parse(localStorage.getItem("userCart"))
  // console.log("products",JSON.parse(products))
  const response = await fetch(`https://dummyjson.com/carts/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({
      userId,
      products
    })
  });

  return response.json();
});


// get all orders
const getCart = createAsyncThunk("getCart", async () => {
  const response = await fetch(`https://dummyjson.com/carts/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  return response.json();
});


// search product 

const searchProduct = createAsyncThunk("searchProduct", async (searchValue) => {
  
  const response = await fetch(`https://dummyjson.com/products/search?q=${searchValue}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  return response.json();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  
  
  reducers: {



// get cartitem count for intial
    getCartCount:(state,action)=>{
      const localData = localStorage.getItem("userCart");

      if (localData) {
        const parsedData = JSON.parse(localData);
        const newData = [...parsedData];
      state.cartItemCount = newData.length;
      }else{
        state.cartItemCount=0
      }
    },

    // add product to local cart
    addToCartToLocal: (state, action) => {
      const id = action.payload.id;
      const quantity = 1;
    
      // Get existing local data
      const localData = localStorage.getItem("userCart");
      console.log("localData", localData);
    
      // Remove the existing local data
      localStorage.removeItem("userCart");
    
      // If localData is not null, parse it and append the new item
      if (localData) {
        const parsedData = JSON.parse(localData);
        const newData = [...parsedData, { id, quantity }];
        localStorage.setItem("userCart", JSON.stringify(newData));
    
        // Update cartItemCount in the state
        state.cartItemCount = newData.length;
        console.log(newData.length);
      } else {
        // If localData is null, create a new array and store it

        localStorage.setItem("userCart", JSON.stringify([{ id, quantity }]));
    
        // Update cartItemCount in the state
        state.cartItemCount = 1;
      }
    }
    
  },
  
  
  extraReducers: (builder) => {
    builder.addCase(LoginUser.fulfilled, (state, action) => {
   
      console.log("logindata", action.payload);
      state.loading = false;
        state.user=action.payload;
        state.token=action.payload.token
      localStorage.setItem("token", action.payload?.token);
      localStorage.setItem("user",JSON.stringify(action.payload))

    });


    // get user Info
    builder.addCase(getUserInfo.fulfilled,(state,action)=>{
      // console.log("user data",action.payload)
      state.userProfileData=action.payload
    })

    // get getSingleProduct
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
    //   console.log("single product",action.payload)
        state.currentProduct = action.payload;
    });

    // fetch products
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
    //   console.log("fetch products  ", action.payload?.products);
        state.products=action.payload.products
    });

    // addToCart
    builder.addCase(addToCart.fulfilled, (state, action) => {
      console.log("addToCart",action.payload)
    //   state.userOrders = action.payload;
    });

 
    //  getCart
    builder.addCase(getCart.fulfilled, (state, action) => {
    //   console.log("get cart",action.payload)
        state.userCart=action.payload
    });

    // search product
    builder.addCase(searchProduct.fulfilled,(state,action)=>{
      // console.log("search data",action.payload)
      state.filterProducts=action.payload.products
    })

   
  },
});

export default userSlice.reducer;
export {
  LoginUser,
  getSingleProduct,
  fetchProducts,
  getCart,
  addToCart,
  searchProduct,
  getUserInfo,
  
};

export const {
  addToCartToLocal,
  getCartCount
} = userSlice.actions;
