// import { useEffect, useState } from 'react';
// import { categories } from '../utils/helper';
// import { getAllProducts } from '../api/api';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCategory, setSearchKeyword, setProducts } from '../redux/productSlice';

// const HomePage = () => {
//     const [products, setProductsState] = useState([]);
//     const { category } = useSelector((state) => state.products);
//     const dispatch = useDispatch();

//     const handleSelectCategories = (cate) => {
//         dispatch(setSearchKeyword(""));
//         if (category === cate) {
//             dispatch(setCategory(""));
//         } else {
//             dispatch(setCategory(cate));
//         }
//     };

//     useEffect(() => {
//         const fetchProducts = async () => {
//           try {
//             const data = await getAllProducts(); // getAllProducts() will throw an error if the request fails
//             setProductsState(data);
//             dispatch(setProducts(data));
//           } catch (error) {
//             // Handle network or server errors
//             console.error('Error fetching products:', error);
//             // Optionally set an error state to show a message to the user
//           }
//         };
//         fetchProducts();
//       }, [dispatch]);
      

//     const filteredProducts = products.filter(product => 
//         category === "" || product.category === category
//     );

//     return (
//         <>
//             {/* Category section */}
//             <section className='categories w-full flex items-center justify-start gap-4 p-4 bg-green-300 overflow-x-auto scrollbar-none'>
//                 {categories.map((categoryOptions, index) => {
//                     const isActive = categoryOptions.pseudoName === category;
//                     return (
//                         <div key={index}
//                             onClick={() => handleSelectCategories(categoryOptions.pseudoName)}
//                             className={`flex justify-center items-center ${isActive ? "bg-green-600 text-white" : "bg-green-100"} rounded-xl px-2 py-1 cursor-pointer text-green-900`}
//                         >
//                             <div className='image min-w-12 h-12'>
//                                 <img src={categoryOptions.image} alt="" width={40} />
//                             </div>
//                             <div className='max-w-20 text-sm font-bold'>
//                                 {categoryOptions.title}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </section>

//             {/* Product section */}
//             <section className='w-full min-h-[80vh] pr-8 py-2 bg-green-50 mx-auto'>
//                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//                     {filteredProducts.map((product, index) => (
//                         <div key={index} className='border border-gray-300 rounded-lg p-4 bg-white'>
//                             <img src={product.images} alt={product.title} className='w-full h-40 object-cover mb-2 rounded-lg' />
//                             <h2 className='text-lg font-bold mb-1'>{product.title}</h2>
//                             <p className='text-gray-600 mb-1'>${product.price.toFixed(2)}</p>
//                             <p className='text-sm text-gray-500 mb-2'>{product.desc}</p>
//                             <div className='flex items-center justify-between'>
//                                 <span className={`text-sm ${product.fastDelivery ? "text-green-600" : "text-red-600"}`}>
//                                     {product.fastDelivery ? "Fast Delivery" : "Standard Delivery"}
//                                 </span>
//                                 <span className={`text-sm ${product.featured ? "text-yellow-500" : "text-gray-500"}`}>
//                                     {product.featured ? "Featured" : "Not Featured"}
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </>
//     );
// };

// export default HomePage;



import { useEffect, useState } from 'react';
import { categories } from '../utils/helper';
import { getAllProducts } from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSearchKeyword, setProducts } from '../redux/productSlice';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [products, setProductsState] = useState([]);
    const { category } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const handleSelectCategories = (cate) => {
        dispatch(setSearchKeyword(""));
        if (category === cate) {
            dispatch(setCategory(""));
        } else {
            dispatch(setCategory(cate));
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts(); // getAllProducts() will throw an error if the request fails
                setProductsState(data);
                dispatch(setProducts(data));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [dispatch]);

    const filteredProducts = products.filter(product => 
        category === "" || product.category === category
    );

    return (
        <>
            {/* Category section */}
            <section className='categories w-full flex items-center justify-start gap-4 p-4 bg-green-300 overflow-x-auto scrollbar-none'>
                {categories.map((categoryOptions, index) => {
                    const isActive = categoryOptions.pseudoName === category;
                    return (
                        <div key={index}
                            onClick={() => handleSelectCategories(categoryOptions.pseudoName)}
                            className={`flex justify-center items-center ${isActive ? "bg-green-600 text-white" : "bg-green-100"} rounded-xl px-2 py-1 cursor-pointer text-green-900`}
                        >
                            <div className='image min-w-12 h-12'>
                                <img src={categoryOptions.image} alt="" width={40} />
                            </div>
                            <div className='max-w-20 text-sm font-bold'>
                                {categoryOptions.title}
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Product section */}
            <section className='w-full min-h-[80vh] pr-8 py-2 bg-green-50 mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {filteredProducts.map((product, index) => (
                        <Link to={`/product/${product._id}`} key={index} className='border border-gray-300 rounded-lg p-4 bg-white'>
                            <img src={product.images} alt={product.title} className='w-full h-40 object-cover mb-2 rounded-lg' />
                            <h2 className='text-lg font-bold mb-1'>{product.title}</h2>
                            <p className='text-gray-600 mb-1'>${product.price.toFixed(2)}</p>
                            <p className='text-sm text-gray-500 mb-2'>{product.desc}</p>
                            <div className='flex items-center justify-between'>
                                <span className={`text-sm ${product.fastDelivery ? "text-green-600" : "text-red-600"}`}>
                                    {product.fastDelivery ? "Fast Delivery" : "Standard Delivery"}
                                </span>
                                <span className={`text-sm ${product.featured ? "text-yellow-500" : "text-gray-500"}`}>
                                    {product.featured ? "Featured" : "Not Featured"}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
};

export default HomePage;
