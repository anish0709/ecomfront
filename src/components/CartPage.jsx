import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, setCartItems, updateCartItem } from '../redux/cartSlice';
import { getCartItemsFromDB, deleteCartItemFromDB, saveCartToDB } from '../api/api';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('user'))?._id;
                const sessionId = localStorage.getItem('sessionId');

                if (userId || sessionId) {
                    const fetchedCartItems = await getCartItemsFromDB({ userId, sessionId });
                    dispatch(setCartItems(fetchedCartItems));
                }
            } catch (error) {
                console.error('Failed to load cart items from database:', error);
            }
        };

        loadCartItems();
    }, [dispatch]);

    const handleRemoveFromCart = async (cartItemId) => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))?._id;
            const sessionId = localStorage.getItem('sessionId');

            // Remove the item from Redux state first
            dispatch(removeFromCart(cartItemId));

            // Then, delete the item from the database
            await deleteCartItemFromDB(cartItemId, { userId, sessionId });
        } catch (error) {
            console.error('Failed to remove item from cart in database:', error);
        }
    };

    const handleQuantityChange = async (cartItemId, newQuantity) => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))?._id;
            const sessionId = localStorage.getItem('sessionId');
    
            // Update the quantity in Redux state first
            dispatch(updateCartItem({ id: cartItemId, quantity: newQuantity }));
    
            // Save the updated cart back to the database
            await saveCartToDB({ userId, sessionId, items: [...cartItems.map(item => 
                item._id === cartItemId ? { ...item, quantity: newQuantity } : item
            )] });
        } catch (error) {
            console.error('Failed to update cart item quantity in database:', error);
        }
    };

    return (
        <div className="min-h-screen p-10 bg-gray-100">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600">Your cart is empty</div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {cartItems.map((item, index) => (
                        <div key={item._id || index} className="flex items-center justify-between mb-4">
                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                            <div className="flex-1 ml-4">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-gray-600">${item.price}</p>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                    className="mt-2 p-1 border rounded-md w-16 text-center"
                                />
                            </div>
                            <div className="ml-4">
                                <button
                                    onClick={() => handleRemoveFromCart(item._id)}
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end mt-6">
                        <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
