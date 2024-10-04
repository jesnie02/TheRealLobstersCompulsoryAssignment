import { useState } from 'react';
import OrderPopup from "../Order/OrderPopup.tsx";

export default function CreateOrderButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    return (
        <>
            <button className="btn btn-outline mt-1" onClick={openPopup}>
                Make Order
            </button>
            <OrderPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
}