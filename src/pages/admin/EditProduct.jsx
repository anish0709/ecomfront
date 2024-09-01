import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById, updateProduct as updateProductApi } from '../../api/api';
import Swal from 'sweetalert2';
import { updateProduct } from '../../redux/productSlice';

const EditProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [updatedProduct, setUpdatedProduct] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e, field) => {
        setUpdatedProduct({ ...updatedProduct, [field]: e.target.value });
    };

    const handleCheckboxChange = (e, field) => {
        setUpdatedProduct({ ...updatedProduct, [field]: e.target.checked });
    };

    const getProduct = async () => {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        setUpdatedProduct(fetchedProduct);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const updatedData = await updateProductApi(productId, updatedProduct);
            dispatch(updateProduct(updatedData)); // Update the Redux store
            Swal.fire({
                icon: 'success',
                title: 'Product updated successfully',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/admin/dashboard');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div className='w-full h-full bg-green-50 flex flex-col justify-center'>
            <div className='flex justify-center items-center'>
                <div className='w-[70vw] flex justify-between items-center py-6'>
                    <h2 className='text-xl text-gray-800 font-semibold'>
                        Update Product
                    </h2>
                    <span>{product.title}</span>
                    <button
                        onClick={handleUpdateProduct}
                        className='flex w-[170px] justify-center items-center rounded-md bg-gray-600 px-3 py-1.5 text-md font-semibold text-white shadow-md'
                    >
                        Update Product
                    </button>
                </div>
            </div>
            <form className='mt-2 w-full flex flex-col items-center text-gray-700 font-semibold pb-6'>
                <h1 className='text-gray-800 font-semibold'>Product Information:</h1>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='title'>Title:</label>
                    <input
                        type='text'
                        name='title'
                        value={updatedProduct.title}
                        onChange={(e) => handleChange(e, 'title')}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='category'>Category:</label>
                    <input
                        type='text'
                        name='category'
                        value={updatedProduct.category}
                        onChange={(e) => handleChange(e, 'category')}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='price'>Price:</label>
                    <input
                        type='number'
                        name='price'
                        value={updatedProduct.price}
                        onChange={(e) => handleChange(e, 'price')}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='stock'>Stock:</label>
                    <input
                        type='number'
                        name='stock'
                        value={updatedProduct.stock}
                        onChange={(e) => handleChange(e, 'stock')}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='desc'>Description:</label>
                    <textarea
                        name='desc'
                        value={updatedProduct.desc}
                        rows={3}
                        cols={30}
                        onChange={(e) => handleChange(e, 'desc')}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='fastdelivery'>Fast Delivery:</label>
                    <input
                        type='checkbox'
                        name='fastdelivery'
                        checked={updatedProduct.fastdelivery}
                        onChange={(e) => handleCheckboxChange(e, 'fastdelivery')}
                        className='block rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
