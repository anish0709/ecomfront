import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    sortBy: "Featured",
    searchKeyword: "",
    category: ""
}

const productReducer = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(product => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        }
    }
});

export const { setSearchKeyword, setCategory, setProducts, removeProduct, updateProduct } = productReducer.actions;
export default productReducer.reducer;
