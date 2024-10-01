
import GetAllCustomer from "../Customer/GetAllCustomer.tsx";
import GetAllOrdersComponent from "../Order/GetOrderHistory/GetAllOrdersComponent.tsx";

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! Here you can manage the application.</p>
            <GetAllCustomer />
            <GetAllOrdersComponent/>
        </div>
    );
};

export default AdminDashboard;
