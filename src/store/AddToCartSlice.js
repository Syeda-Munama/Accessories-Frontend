
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToCart: [],
  isLoading: false,
  isError: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.addToCart.findIndex((p) => p._id === product._id);

      if (existingProductIndex === -1) {
        // If the product is not in the cart, add it with count = 1
        state.addToCart.push({ ...product, count: 1 });
      } else {
        // If the product is already in the cart, do nothing or show a message
        console.log("Product already in cart. Use increment action to add more.");
      }

    },
    addCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.addToCart.findIndex((p) => p._id === product._id);

      if (existingProductIndex === -1) {
        state.addToCart.push({ ...product, count: 1 });
      } else {
        console.log("Product already in cart. Use increment action to add more.");
      }
    },
    removeAddToCart: (state, action) => {
      state.addToCart = state.addToCart.filter(
        (prod) => prod._id !== action.payload
      );
    },
    cartIncrement: (state, action) => {
      const product = state.addToCart.find((p) => p._id === action.payload);
      if (product) {
        product.count += 1;
      }
    },
    cartDecrement: (state, action) => {
      const product = state.addToCart.find((p) => p._id === action.payload);
      if (product && product.count > 1) {
        product.count -= 1;
      }
    },
    clearCart : (state)=>{
      state.addToCart = [];
    }
  },
});

const { actions, reducer } = cartSlice;
export const { addCart, removeAddToCart, cartIncrement, cartDecrement,clearCart } = actions;

export default reducer;
