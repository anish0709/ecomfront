import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../api/api';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: 0,
        desc: "",
        ratings: 0,
        fastDelivery: false,
        category: "",
        stock: 0,
        images: "", // assuming a single image URL for simplicity
        quantity: 1, // default quantity
        featured: false, // whether the product is featured
    });

    const navigate = useNavigate();

    const handleChange = (e, field) => {
        setNewProduct({ ...newProduct, [field]: e.target.value });
    };

    const handleCheckboxChange = (e, field) => {
        setNewProduct({ ...newProduct, [field]: e.target.checked });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            await addProduct(newProduct); // API call to add the product
            Swal.fire({
                icon: "success",
                title: "Product added successfully",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
            navigate("/admin/dashboard"); // Navigate to dashboard after successful addition
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error adding product",
                text: error.message,
            });
        }
    };

    return (
        <div className='w-full h-full bg-green-50 flex flex-col justify-center'>
            <div className='flex justify-center items-center'>
                <div className='w-[70vw] flex justify-between items-center py-6'>
                    <h2 className='text-xl text-gray-800 font-semibold'>
                        Add New Product
                    </h2>
                    <button
                        onClick={handleAddProduct}
                        className='flex w-[170px] justify-center items-center rounded-md bg-gray-600 px-3 py-1.5 text-md font-semibold text-white shadow-md'
                    >
                        Add Product
                    </button>
                </div>
            </div>
            <form className='mt-2 w-full flex flex-col items-center text-gray-700 font-semibold pb-6'>
                <h1 className='text-gray-800 font-semibold'>Enter Product Information:</h1>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='title'>Title:</label>
                    <input
                        type='text'
                        name='title'
                        value={newProduct.title}
                        onChange={(e) => handleChange(e, "title")}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='category'>Category:</label>
                    <input
                        type='text'
                        name='category'
                        value={newProduct.category}
                        onChange={(e) => handleChange(e, "category")}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='price'>Price:</label>
                    <input
                        type='number'
                        name='price'
                        value={newProduct.price}
                        onChange={(e) => handleChange(e, "price")}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='stock'>Stock:</label>
                    <input
                        type='number'
                        name='stock'
                        value={newProduct.stock}
                        onChange={(e) => handleChange(e, "stock")}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='desc'>Description:</label>
                    <textarea
                        name='desc'
                        value={newProduct.desc}
                        rows={3}
                        cols={30}
                        onChange={(e) => handleChange(e, "desc")}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='images'>Image URL:</label>
                    <input
                        type='text'
                        name='images'
                        value={newProduct.images}
                        onChange={(e) => handleChange(e, "images")}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='quantity'>Quantity:</label>
                    <input
                        type='number'
                        name='quantity'
                        value={newProduct.quantity}
                        onChange={(e) => handleChange(e, "quantity")}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='fastDelivery'>Fast Delivery:</label>
                    <input
                        type='checkbox'
                        name='fastDelivery'
                        checked={newProduct.fastDelivery}
                        onChange={(e) => handleCheckboxChange(e, "fastDelivery")}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

                <div className='mt-5 flex justify-start items-start gap-4'>
                    <label htmlFor='featured'>Featured:</label>
                    <input
                        type='checkbox'
                        name='featured'
                        checked={newProduct.featured}
                        onChange={(e) => handleCheckboxChange(e, "featured")}
                        className='block w-[200px] rounded-md border-0 py-1.5 text-green-950 shadow-md ring-1 ring-inset ring-green-200'
                    />
                </div>

            </form>
        </div>
    );
}

export default AddProduct;
