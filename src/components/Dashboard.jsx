import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import ManageProducts from '../pages/admin/ManageProducts';
// Import these if you haven't already
// import ManageCustomers from '../pages/admin/ManageCustomers';
// import ManageOrders from '../pages/admin/ManageOrders';

const Dashboard = () => {
    const [currentComponent, setCurrentComponent] = useState("ManageProducts");

    const handleNavigate = (link) => {
        setCurrentComponent(link);
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case "ManageProducts":
                return <ManageProducts />;
            case "ManageCustomers":
                return <ManageCustomers />;
            case "ManageOrders":
                return <ManageOrders />;
            default:
                return <></>; // Safely handle unknown cases
        }
    };

    return (
        <div className='flex h-full bg-green-50'>
            <DashboardSidebar onNavigate={handleNavigate} />
            <div className='flex-1 p-4 bg-green-50'>
                {renderComponent()}
            </div>
        </div>
    );
};

export default Dashboard;
