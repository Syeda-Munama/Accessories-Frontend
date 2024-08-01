import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice"
import addToCartReducer from "./AddToCartSlice"

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig ={
    key : "cart",
    storage
}
 const store = configureStore({
    reducer:{
        productReducer,
        addToCartReducer: persistReducer(persistConfig,addToCartReducer)
    }
})

export const persistor = persistStore(store)
export default store;