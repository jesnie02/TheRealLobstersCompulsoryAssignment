import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom";
import cartLogo from '/assets/CartLogo.png';
import { useEffect, useRef, useState } from "react";
import CartContainer from "../Cart/CartContainer.tsx";

const CartLogo = () => {
    const [cart] = useAtom(CartAtom);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        console.log("Dropdown toggled");
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
        <div className="cart-logo" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="Cart-button">
                <img src={cartLogo} alt="Cart" className="cart-image" />
                <span className="cart-count">{cart.length}</span>
            </button>
            {isOpen && (
                <div className="cart-dropdown-menu">
                    <CartContainer />
                </div>
            )}
        </div>
    );
};

export default CartLogo;