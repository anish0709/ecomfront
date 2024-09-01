// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getProductById } from '../api/api';
// import { FiTruck, FiDollarSign } from 'react-icons/fi';
// import { v4 as uuidv4 } from 'uuid';

// const ProductDetails = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);

//     useEffect(() => {
//         const userId = localStorage.getItem('user')?._id;

//         if (!userId) {
//             // Generate a new session ID and store it in localStorage
//             const sessionId = uuidv4();
//             localStorage.setItem('sessionId', sessionId);
//         }

//         const fetchProduct = async () => {
//             const fetchedProduct = await getProductById(productId);
//             setProduct(fetchedProduct);
//         };
//         fetchProduct();
//     }, [productId]);

//     if (!product) return <div>Loading...</div>;

//     return (
//         <div className="flex flex-col items-center justify-center py-10 bg-gray-100 min-h-screen">
//             <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-8">
//                 <div className="flex flex-col md:flex-row">
//                     <div className="md:w-1/2">
//                         <img
//                             src={product.imageUrl}
//                             alt={product.title}
//                             className="w-full h-full object-cover rounded-lg shadow-md"
//                         />
//                     </div>
//                     <div className="md:w-1/2 md:pl-10 mt-5 md:mt-0">
//                         <h2 className="text-3xl font-semibold text-gray-800">
//                             {product.title}
//                         </h2>
//                         <p className="text-gray-600 mt-4">
//                             {product.desc}
//                         </p>
//                         <div className="mt-6">
//                             <p className="text-2xl font-bold text-gray-800">
//                                 <FiDollarSign className="inline-block mr-1" />
//                                 {product.price}
//                             </p>
//                         </div>
//                         <div className="mt-6">
//                             <p className={`text-lg font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                                 {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
//                             </p>
//                         </div>
//                         <div className="mt-6">
//                             <p className="text-lg font-medium text-gray-800">
//                                 Category: <span className="text-gray-600">{product.category}</span>
//                             </p>
//                         </div>
//                         <div className="mt-6 flex items-center">
//                             <FiTruck className="text-gray-700 mr-2" />
//                             <p className="text-lg font-medium text-gray-800">
//                                 {product.fastdelivery ? 'Fast Delivery Available' : 'Standard Delivery'}
//                             </p>
//                         </div>
//                         <button className="mt-8 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200">
//                             Add to Cart
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;



// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// import { getProductById, saveCartToDB } from '../api/api';
// import { FiTruck, FiDollarSign } from 'react-icons/fi';
// import { v4 as uuidv4 } from 'uuid';
// import Swal from 'sweetalert2';

// const ProductDetails = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userId = localStorage.getItem('user')?._id;

//         if (!userId) {
//             const sessionId = uuidv4();
//             localStorage.setItem('sessionId', sessionId);
//         }

//         const fetchProduct = async () => {
//             const fetchedProduct = await getProductById(productId);
//             setProduct(fetchedProduct);
//         };
//         fetchProduct();
//     }, [productId]);

//     // const handleAddToCart = async () => {
//     //     if (product) {
//     //         let userId = JSON.parse(localStorage.getItem('user'))?._id;
//     //         let sessionId = localStorage.getItem('sessionId');
        
//     //         if (!userId && !sessionId) {
//     //             sessionId = uuidv4();
//     //             localStorage.setItem('sessionId', sessionId);
//     //         }
        
//     //         dispatch(addToCart({ ...product, quantity: 1 }));
        
//     //         const cartItem = { ...product, quantity: 1 };
        
//     //         try {
//     //             await saveCartToDB({ userId, sessionId, items: [cartItem] });
//     //             Swal.fire({
//     //                 icon: 'success',
//     //                 title: 'Product Added!',
//     //                 text: 'The product has been added to your cart successfully.',
//     //                 confirmButtonText: 'Go to Cart'
//     //             }).then((result) => {
//     //                 if (result.isConfirmed) {
//     //                     navigate('/cart');
//     //                 }
//     //             });
//     //         } catch (error) {
//     //             Swal.fire({
//     //                 icon: 'error',
//     //                 title: 'Error!',
//     //                 text: `Failed to add product to cart. ${error.response ? error.response.data.message : 'Please try again.'}`,
//     //                 confirmButtonText: 'OK'
//     //             });
//     //         }
//     //     }
//     // };
//     const handleAddToCart = async () => {
//         if (product) {
//             let userId = await JSON.parse(localStorage.getItem('user'))?._id;
//             let sessionId = localStorage.getItem('sessionId');
//             console.log(userId);
//             // Generate session ID only if userId is missing and sessionId does not exist
//             if (!userId && !sessionId) {
//                 sessionId = uuidv4();
//                 localStorage.setItem('sessionId', sessionId);
//             }
    
//             const cartItem = { 
//                 productId: product._id,
//                 title: product.title,
//                 price: product.price,
//                 quantity: 1,
//                 image: product.imageUrl
//             };
    
//             dispatch(addToCart(cartItem));
    
//             try {
//                 await saveCartToDB({ userId, sessionId, items: [cartItem] });
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Product Added!',
//                     text: 'The product has been added to your cart successfully.',
//                     confirmButtonText: 'Go to Cart'
//                 }).then((result) => {
//                     if (result.isConfirmed) {
//                         navigate('/cart');
//                     }
//                 });
//             } catch (error) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error!',
//                     text: `Failed to add product to cart. ${error.response ? error.response.data.message : 'Please try again.'}`,
//                     confirmButtonText: 'OK'
//                 });
//             }
//         }
//     };
    
    
    
//     if (!product) return <div>Loading...</div>;

//     return (
//         <div className="flex flex-col items-center justify-center py-10 bg-gray-100 min-h-screen">
//             <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-8">
//                 <div className="flex flex-col md:flex-row">
//                     <div className="md:w-1/2">
//                         <img
//                             src={product.imageUrl}
//                             alt={product.title}
//                             className="w-full h-full object-cover rounded-lg shadow-md"
//                         />
//                     </div>
//                     <div className="md:w-1/2 md:pl-10 mt-5 md:mt-0">
//                         <h2 className="text-3xl font-semibold text-gray-800">
//                             {product.title}
//                         </h2>
//                         <p className="text-gray-600 mt-4">
//                             {product.desc}
//                         </p>
//                         <div className="mt-6">
//                             <p className="text-2xl font-bold text-gray-800">
//                                 <FiDollarSign className="inline-block mr-1" />
//                                 {product.price}
//                             </p>
//                         </div>
//                         <div className="mt-6">
//                             <p className={`text-lg font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                                 {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
//                             </p>
//                         </div>
//                         <div className="mt-6">
//                             <p className="text-lg font-medium text-gray-800">
//                                 Category: <span className="text-gray-600">{product.category}</span>
//                             </p>
//                         </div>
//                         <div className="mt-6 flex items-center">
//                             <FiTruck className="text-gray-700 mr-2" />
//                             <p className="text-lg font-medium text-gray-800">
//                                 {product.fastdelivery ? 'Fast Delivery Available' : 'Standard Delivery'}
//                             </p>
//                         </div>
//                         <button
//                             className="mt-8 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200"
//                             onClick={handleAddToCart}
//                         >
//                             Add to Cart
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { getProductById, saveCartToDB } from '../api/api';
import { FiTruck, FiDollarSign } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('user'))?._id;
        let sessionId = localStorage.getItem('sessionId');

        if (!userId && !sessionId) {
            sessionId = uuidv4();
            localStorage.setItem('sessionId', sessionId);
        }

        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProductById(productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };
        
        fetchProduct();
    }, [productId]);

    const handleAddToCart = async () => {
        if (product) {
            const userId = JSON.parse(localStorage.getItem('user'))?._id;
            const sessionId = localStorage.getItem('sessionId');

            const cartItem = { 
                productId: product._id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.imageUrl
            };

            dispatch(addToCart(cartItem));

            try {
                await saveCartToDB({ userId, sessionId, items: [cartItem] });
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added!',
                    text: 'The product has been added to your cart successfully.',
                    confirmButtonText: 'Go to Cart'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/cart');
                    }
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `Failed to add product to cart. ${error.response ? error.response.data.message : 'Please try again.'}`,
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center py-10 bg-gray-100 min-h-screen">
            <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-10 mt-5 md:mt-0">
                        <h2 className="text-3xl font-semibold text-gray-800">
                            {product.title}
                        </h2>
                        <p className="text-gray-600 mt-4">
                            {product.desc}
                        </p>
                        <div className="mt-6">
                            <p className="text-2xl font-bold text-gray-800">
                                <FiDollarSign className="inline-block mr-1" />
                                {product.price}
                            </p>
                        </div>
                        <div className="mt-6">
                            <p className={`text-lg font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </p>
                        </div>
                        <div className="mt-6">
                            <p className="text-lg font-medium text-gray-800">
                                Category: <span className="text-gray-600">{product.category}</span>
                            </p>
                        </div>
                        <div className="mt-6 flex items-center">
                            <FiTruck className="text-gray-700 mr-2" />
                            <p className="text-lg font-medium text-gray-800">
                                {product.fastdelivery ? 'Fast Delivery Available' : 'Standard Delivery'}
                            </p>
                        </div>
                        <button
                            className="mt-8 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
