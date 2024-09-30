import { Route, Routes } from 'react-router-dom';
import AdminDashboard from "./AdminDashboard.tsx";

const AdminApp = () => {
    return (
        <div>
            <Routes>
                {/* This path is relative to /adminDash */}
                <Route path="/" element={<AdminDashboard />} />
            </Routes>
        </div>
    );
};

export default AdminApp;
