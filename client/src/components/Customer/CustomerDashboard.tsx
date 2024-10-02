import GetAllPaperComponent from "../Paper/GetAllPaperComponent.tsx";
import {useNavigate} from "react-router-dom";

const CustomerDashboard = () => {

    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login-customer');
    };

    return (
        <div>
            <h1>Customer Dashboard</h1>
            <p>Welcome, Customer! Here you can view your information and interact with the application.</p>
            <button className="btn btn-primary" onClick={handleLoginClick}>Go to Login</button>
            <GetAllPaperComponent/>

        </div>
    );
};

export default CustomerDashboard;