import { useState } from "react";
import { Link } from "react-router-dom";
import cartLogo from '/assets/CartLogo.png';

const CartLogo = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="Cart-logo">
            <button onClick={toggleDropdown} className="profile-button">
                <img src={cartLogo} alt="Cart" className="profile-image" />
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <Link to="/cart">Cart</Link> {/* Updated link to cart */}
                </div>
            )}
        </div>
    );
};

export default CartLogo;