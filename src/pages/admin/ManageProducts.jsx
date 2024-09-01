import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../api/api';
import { removeProduct } from '../../redux/productSlice';


const ManageProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    // console.log(products);
    const handledeleteproduct = async (e, id) => {
        e.stopPropagation();
        try {
            // console.log("Deleting product with ID:", id);
            await deleteProduct(id);
            dispatch(removeProduct(id)); // Remove the product from Redux store

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Product deleted successfully"
            });
        } catch (error) {
            console.log("Error deleting product", error);
        }
    };

    return (
        <div className='main col-span-9 flex-1'>
            <div className='flex justify-between items-center p-3'>
                <h2 className='font-bold text-green-900'>Manage Products</h2>
                <button
                    onClick={() => navigate("/admin/addProduct")}
                    className='bg-green-700 text-white font-bold py-1 px-2 rounded mr-2 flex w-[120px] justify-center items-center text-md leading-6 shadow-md'
                >
                    Add Product
                </button>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full divide-y divide-green-200 bg-green-200'>
                    {/* Table Head */}
                    <thead className='bg-green-300 text-gray-800 font-bold'>
                        <tr>
                            <th className='px-4 py-2'>#</th>
                            <th scope="col" className='px-4 py-2 text-left font-bold text-green-800 tracking-wider'>Title</th>
                            <th scope="col" className='px-4 py-2 text-left font-bold text-green-800 tracking-wider'>Price</th>
                            <th scope="col" className='px-4 py-2 text-left font-bold text-green-800 tracking-wider'>Stock</th>
                            <th scope="col" className='px-4 py-2 text-left font-bold text-green-800 tracking-wider'>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='bg-green-50 divide-y divide-gray-300'>
                        {products.map((product, index) => (
                            <tr
                                className='cursor-pointer text-green-800 font-semibold hover:bg-green-100 transition-colors'
                                key={product._id}
                                onClick={() => navigate(`/products/${product._id}`)}
                            >
                                <th className='px-4 py-2'>{index + 1}</th>
                                <td className='px-4 py-2'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-12 h-12 flex-shrink-0'>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className='w-full h-full object-cover rounded'
                                            />
                                        </div>
                                        <div className='font-bold text-green-900 max-w-full break-words'>
                                            {product.title}
                                        </div>
                                    </div>
                                </td>

                                <td className='px-4 py-2'>
                                    {product.price}
                                </td>

                                <td className='px-4 py-2'>
                                    {product.stock}
                                </td>

                                <td className='px-4 py-2 flex justify-start items-center gap-6'>
                                    <span onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/admin/editProduct/${product._id}`)
                                    }}>
                                        <FaEdit className='text-gray-900' size={26} />
                                    </span>

                                    <span onClick={(e) => handledeleteproduct(e, product._id)}>
                                        <MdDeleteForever color='#ff0110' size={30} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;
