import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom";
import cartLogo from '/assets/CartLogo.png';
import { useState } from "react";
import CartContainer from "../Cart/CartContainer.tsx";
import CreateOrderButton from "./CreateOrderButton.tsx";

const CartLogo = () => {
    const [cart] = useAtom(CartAtom);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        console.log("Dropdown toggled");
        setIsOpen(!isOpen);
    };

    return (
        <div className="cart-logo">
            <button onClick={toggleDropdown} className="Cart-button">
                <img src={cartLogo} alt="Cart" className="cart-image" />
                <span className="cart-count">{cart.length}</span>
            </button>
            {isOpen && (
                <div className="cart-dropdown-menu">
                    <CartContainer/>
                    <CreateOrderButton/>
                </div>
            )}
        </div>
    );
};

export default CartLogo;