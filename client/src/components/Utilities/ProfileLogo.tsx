import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import profileLogo from '/assets/ProfilePictures/ProfileLogo.png';

const ProfileLogo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative profile-logo" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="profile-button">
                <img src={profileLogo} alt="Profile" className="profile-image" />
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