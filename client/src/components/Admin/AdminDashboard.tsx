import GetAllPaperComponent from "../Paper/GetAllPaperComponent.tsx";

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! Here you can manage the application.</p>
            <GetAllPaperComponent />
        </div>
    );
};

export default AdminDashboard;
