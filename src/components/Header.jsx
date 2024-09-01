import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCircleXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchKeyword } from '../redux/productSlice';
import { FaCartShopping } from 'react-icons/fa6';
import { adminId } from '../utils/helper';
import { HiLogout } from 'react-icons/hi';
import { FaAngleRight } from 'react-icons/fa';
import { setUser } from '../redux/authSlice';

const Header = () => {
    const [searchValue, setSearchValue] = useState("");
    const [inputActive, setInputActive] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve user from local storage on component mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || "{}");
        if (storedUser) {
            dispatch(setUser(storedUser));
        }
    }, [dispatch]);

    // Safely access the user from the Redux state
    const user = useSelector((state) => state.user.user); // Correct state slice for user

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        setInputActive(e.target.value !== "");
    };

    const shouldRenderHeader = !["/login", "/signup"].includes(location.pathname);

    return shouldRenderHeader ? (
        <div className="container-header bg-green-100">
            <header className="w-full h-12 max-w-[1300px] m-auto bg-green-100 flex justify-between items-center gap-4 py-3 px-4 pt-2">
                {/* Logo */}
                <Link to="/" className="left-container flex items-center gap-2">
                    <img src="https://png.pngtree.com/png-vector/20220207/ourmid/pngtree-e-letter-logo-ecommerce-shop-store-design-png-image_4381099.png" alt="" loading="lazy" className="w-10 rounded-md" />
                    <span className="logo_text text-xl font-semibold text-green-800">
                        E-SHOP
                    </span>
                </Link>

                {/* Search */}
                <div className="center-container flex-1 bg-green-100 rounded-full duration-150 mx-4 relative">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleChange}
                        placeholder="Search for products"
                        className={`search_input px-4 py-2 rounded-full border-none outline-none w-full ${inputActive ? 'active' : ''}`}
                    />
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-800">
                        {searchValue && (
                            <FaCircleXmark
                                onClick={() => {
                                    setSearchValue("");
                                    setInputActive(false);
                                    dispatch(setSearchKeyword(""));
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Profile and cart */}
                <div className="right-container flex gap-4 items-center">
                    <Link to="/cart" className="cart flex items-center gap-2">
                        <FaCartShopping className="text-2xl text-green-800" />
                    </Link>

                    {user ? (
                        <div className="relative">
                            <button
                                className="profile-dropdown-btn"
                                onClick={() => setOpen(!open)}
                            >
                                {user.name}
                            </button>
                            {open && (
                                <div className="absolute top-full right-0 bg-white shadow-lg rounded mt-2 p-2 w-40">
                                    <Link to="/admin/dashboard" className="dropdown-item flex items-center gap-2">
                                        Admin Dashboard <FaAngleRight />
                                    </Link>
                                    <Link to="/profile" className="dropdown-item flex items-center gap-2">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('user');
                                            localStorage.removeItem('token');
                                            dispatch(setUser(null));
                                            navigate("/login");
                                        }}
                                        className="dropdown-item flex items-center gap-2 text-red-500"
                                    >
                                        <HiLogout /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-links flex gap-4">
                            <Link to="/login" className="text-green-800">Login</Link>
                            <Link to="/signup" className="text-green-800">Signup</Link>
                        </div>
                    )}
                </div>
            </header>
        </div>
    ) : null;
};

export default Header;
