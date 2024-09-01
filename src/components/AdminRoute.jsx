import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminId } from "../utils/helper";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user || !adminId.includes(user._id)) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default AdminRoute;
