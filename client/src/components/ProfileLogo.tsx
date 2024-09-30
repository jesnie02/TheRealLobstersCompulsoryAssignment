import { useState } from "react";
import { Link } from "react-router-dom";  // Use Link from react-router-dom
import profileLogo from '../assets/ProfilePictures/ProfileLogo.png';

const ProfileLogo = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="profile-logo">
            <button onClick={toggleDropdown} className="profile-button">
                <img src={profileLogo} alt="Profile" className="profile-image" />
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <Link to="/">Home</Link>
                    <Link to="/customerDash">Customer Dashboard</Link>
                    <Link to="/adminDash">Admin Dashboard</Link>
                </div>
            )}
        </div>
    );
};

export default ProfileLogo;
