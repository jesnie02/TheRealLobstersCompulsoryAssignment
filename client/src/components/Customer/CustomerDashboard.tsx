import LoginCustomer from "./LoginCustomer.tsx";

const CustomerDashboard = () => {

    return (
        <div>
            <h1>Customer Dashboard</h1>
            <p>Welcome, Customer! Here you can view your information and interact with the application.</p>
            <LoginCustomer/>

        </div>
    );
};

export default CustomerDashboard;