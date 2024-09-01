import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/authSlice";
import productReducer from "../redux/productSlice";
import cartReducer from '../redux/cartSlice';
const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        cart: cartReducer
    }
});

export default store;
