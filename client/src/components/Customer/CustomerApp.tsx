import { Route, Routes } from 'react-router-dom';
import CustomerDashboard from "./CustomerDashboard.tsx";
import GetAllPaperComponent from '../Paper/GetAllPapers/GetAllPaperComponent.tsx';

const CustomerApp = () => {
    return (
        <div>
            <Routes>
                {/* This path is relative to /customerDash */}
                <Route path="/" element={<CustomerDashboard />} />

                {/* GetAllPaperComponent accessible from /customerDash/papers */}
                <Route path="papers" element={<GetAllPaperComponent />} />
            </Routes>
        </div>
    );
};

export default CustomerApp;
