import { Route, Routes } from 'react-router-dom';
import AdminDashboard from "./AdminDashboard.tsx";

const AdminApp = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
            </Routes>
        </div>
    );
};

export default AdminApp;
