// import { Route, Routes } from "react-router-dom";
// import Signup from "./auth/Register";
// import Login from "./auth/Login";
// import Header from "./components/Header";
// import HomePage from "./pages/HomePage";
// import ProtectedRoute from './components/ProtectedRoute';
// import { useSelector } from "react-redux";
// import { adminId } from "./utils/helper";
// import AdminRoute from "./components/AdminRoute";
// import Dashboard from "./components/Dashboard";
// import AddProduct from "./pages/admin/AddProduct"; 
// import EditProduct from "./pages/admin/EditProduct";

// function App() {
//   const user = useSelector((state) => state.user.user);

//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Admin route */}
//         {user && adminId.includes(user._id) && (
//           <Route path="/admin/*" element={
//             <AdminRoute>
//               <Routes>
//                 <Route path="dashboard" element={<Dashboard />} />
//                 <Route path="addProduct" element={<AddProduct />} />
//                 <Route path="editProduct/:productId" element={<EditProduct />} />
//               </Routes>
//             </AdminRoute>
//           } />
//         )}
//       </Routes>
//     </>
//   );
// }

// export default App;




// import { Route, Routes } from "react-router-dom";
// import Signup from "./auth/Register";
// import Login from "./auth/Login";
// import Header from "./components/Header";
// import HomePage from "./pages/HomePage";
// import ProtectedRoute from './components/ProtectedRoute';
// import { useSelector } from "react-redux";
// import AdminRoute from "./components/AdminRoute";
// import Dashboard from "./components/Dashboard";
// import AddProduct from "./pages/admin/AddProduct"; 
// import EditProduct from "./pages/admin/EditProduct";

// function App() {
//   // const user = useSelector((state) => state.user.user);

//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Admin routes */}
//         <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
//         <Route path="/admin/addProduct" element={<AdminRoute><AddProduct /></AdminRoute>} />
//         <Route path="/admin/editProduct/:productId" element={<AdminRoute><EditProduct /></AdminRoute>} />
//       </Routes>
//     </>
//   );
// }

// export default App;





import { Route, Routes } from "react-router-dom";
import Signup from "./auth/Register";
import Login from "./auth/Login";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProtectedRoute from './components/ProtectedRoute';
// import { useSelector } from "react-redux";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./components/Dashboard";
import AddProduct from "./pages/admin/AddProduct"; 
import EditProduct from "./pages/admin/EditProduct";
import Profile from "./components/Profile"; 
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
function App() {
  // const user = useSelector((state) => state.user.user);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/product/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<CartPage />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/addProduct" element={<AdminRoute><AddProduct /></AdminRoute>} />
        <Route path="/admin/editProduct/:productId" element={<AdminRoute><EditProduct /></AdminRoute>} />
      </Routes>
    </>
  );
}

export default App;
