import { useState } from "react";
import { Link } from "react-router-dom";
import profileLogo from '/assets/ProfilePictures/ProfileLogo.png';

const ProfileLogo = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative profile-logo">
            <button onClick={toggleDropdown} className="profile-button">
                <img src={profileLogo} alt="Profile" className="profile-image"  />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link to="/customerDash" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Customer Login</Link>
                    <Link to="/adminDash" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Admin Login</Link>
                </div>
            )}
        </div>
    );
};

export default ProfileLogo;