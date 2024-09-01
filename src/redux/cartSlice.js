import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(cartItem => cartItem.productId === item.productId);

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.cartItems.push(item);
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(cartItem => cartItem.productId !== action.payload);
        },
        updateCartItem: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.cartItems.find(cartItem => cartItem.productId === productId);

            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
});

export const { addToCart, removeFromCart, updateCartItem, setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
