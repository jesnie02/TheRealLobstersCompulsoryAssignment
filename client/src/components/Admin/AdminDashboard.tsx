
import GetAllCustomer from "../Customer/GetAllCustomer.tsx";

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! Here you can manage the application.</p>
            <GetAllCustomer />
        </div>
    );
};

export default AdminDashboard;
