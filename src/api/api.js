import axios from 'axios';

// Function to get the auth token from local storage
const getAuthToken = () => localStorage.getItem('token');

// Add the token to headers for authenticated requests
axios.interceptors.request.use(config => {
    const token = getAuthToken();   
    if (token && !config.url.includes('/signup') && !config.url.includes('/login')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Register function
export const register = async (data) => {
    return axios.post('http://localhost:5000/api/signup', data) 
        .then(response => response.data);
};

// Login function
export const login = async (data) => {
    return axios.post('http://localhost:5000/api/login', data)
        .then(response => response.data);
};

// Get all products function
export const getAllProducts = async () => {
    return axios.get('http://localhost:5000/products/getproducts')
        .then(response => response.data)
        .catch(error => {
            console.error('Error in getAllProducts:', error);
            throw error;
        });
};

// Add product function
export const addProduct = async (newProduct) => {
    try {
        const response = await axios.post('http://localhost:5000/products/addProduct', newProduct); 
        return response.data; // Return the response data
    } catch (error) {
        console.log("Error in adding product: ", error);
        throw error;
    }
};

// Delete product function
    export const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/products/delete/${productId}`); 
            return response.data; // Return the response data
        } catch (error) {
            console.log("Error in deleting product: ", error);
            throw error;
        }
    };

// Get product by ID function
export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:5000/products/product/${productId}`);
        return response.data; // Return the response data
    } catch (error) {
        console.log("Error in getting product by ID: ", error); 
        throw error;
    }
};

// Update product function
export const updateProduct = async (productId, updatedProduct) => {
    try {
        const response = await axios.put(`http://localhost:5000/products/updateproducts/${productId}`, updatedProduct);
        return response.data; 
    } catch (error) {
        console.log("Error in updating product: ", error); 
        throw error;
    }
};


// save items to the cart
export const saveCartToDB = async ({ userId, sessionId, items }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/cart', { userId, sessionId, items });
        return response.data;
    } catch (error) {
        console.error('Error saving cart to database:', error.response ? error.response.data : error.message);
        throw error;
    }
};




// get items from the cart
export const getCartItemsFromDB = async ({ userId, sessionId }) => {
    try {
        const endpoint = userId
            ? `/api/cart?userId=${userId}`
            : `/api/cart?sessionId=${sessionId}`;
        const response = await axios.get(`http://localhost:5000${endpoint}`);
        return response.data.items; // Ensure this matches the server response
    } catch (error) {
        console.error('Error fetching cart items from database:', error);
        throw error;
    }
};

// delete item to the cart

// export const deleteCartItemFromDB = async (cartItemId, { userId, sessionId }) => {
//     try {
//         const response = await axios.delete(`http://localhost:5000/api/cart/${cartItemId}`, {
//             data: { userId, sessionId }
//         });
//         return response.data; 
//     } catch (error) {
//         console.error('Failed to remove item from cart:', error);
//         throw error;
//     }
// };
export const deleteCartItemFromDB = async (cartItemId, { userId, sessionId }) => {
    try {
        const response = await axios.delete(
            `http://localhost:5000/api/cart/${cartItemId}`, 
            {
                params: { userId, sessionId }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to remove item from cart:', error);
        throw error;
    }
};


// Quantity function
export const updateCartItemQuantity = async (cartItemId, quantity, { userId, sessionId }) => {
    try {
        const response = await axios.put(
            `http://localhost:5000/api/cart/${cartItemId}/quantity`,
            { quantity },
            { params: { userId, sessionId } }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating quantity:', error);
        throw error;
    }
};

