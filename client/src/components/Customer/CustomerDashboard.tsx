import GetAllPaperComponent from "../Paper/GetAllPaperComponent.tsx";

const CustomerDashboard = () => {
    return (
        <div>
            <h1>Customer Dashboard</h1>
            <p>Welcome, Customer! Here you can view your information and interact with the application.</p>
            <GetAllPaperComponent/>
        </div>
    );
};

export default CustomerDashboard;