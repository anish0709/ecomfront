import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  setCartItems,
  updateCartItem,
} from "../redux/cartSlice";
import {
  getCartItemsFromDB,
  deleteCartItemFromDB,
  updateCartItemQuantity,
} from "../api/api";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))?._id;
        const sessionId = localStorage.getItem("sessionId");

        if (userId || sessionId) {
          const fetchedCartItems = await getCartItemsFromDB({
            userId,
            sessionId,
          });
          dispatch(setCartItems(fetchedCartItems));
        }
      } catch (error) {
        console.error("Failed to load cart items from database:", error);
      }
    };

    loadCartItems();
  }, [dispatch]);

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      const sessionId = localStorage.getItem("sessionId");

      // Remove the item from Redux state first
      dispatch(removeFromCart(cartItemId));

      // Then, delete the item from the database
      await deleteCartItemFromDB(cartItemId, { userId, sessionId });
    } catch (error) {
      console.error("Failed to remove item from cart in database:", error);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity < 1) return; // Prevent setting quantity below 1

      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      const sessionId = localStorage.getItem("sessionId");

      // Optimistically update the quantity in Redux state
      dispatch(updateCartItem({ id: cartItemId, quantity: newQuantity }));

      // Call the API to update the quantity
      const updatedCart = await updateCartItemQuantity(cartItemId, newQuantity, {
        userId,
        sessionId,
      });

      // Update the cart items in Redux store with the updated data from the server
      dispatch(setCartItems(updatedCart.items));
    } catch (error) {
      console.error("Failed to update quantity:", error);
      // Optionally, rollback the optimistic update or show an error message
    }
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty</div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between mb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                    className="mr-2 bg-gray-200 text-gray-700 px-2 py-1 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item._id, Number(e.target.value))
                    }
                    className="p-1 border rounded-md w-16 text-center"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
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
          {/* Total amount display */}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-lg font-semibold">Total Amount:</h2>
            <p className="text-xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
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
