import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Redirect to login if user is not logged in
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

// Define prop types for the component
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
