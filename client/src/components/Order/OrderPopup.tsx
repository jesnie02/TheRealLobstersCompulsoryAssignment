import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { CartAtom } from '../../Atoms/CartAtom';
import { OrdersAtom } from '../../Atoms/OrdersAtom';
import { handleCreateOrder } from './CreateOrder';

interface OrderPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderPopup: React.FC<OrderPopupProps> = ({ isOpen, onClose }) => {
    const [cart, setCart] = useAtom(CartAtom);
    const [, setOrders] = useAtom(OrdersAtom);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    const handleCreateOrderWrapper = async () => {
        await handleCreateOrder(
            cart,
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            deliveryDate,
            setOrders,
            onClose
        );
        setCart([]); // Clear the cart after creating the order
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-5 border border-gray-300 w-4/5 max-w-lg rounded-lg">
                <span className="text-gray-500 float-right text-2xl font-bold cursor-pointer"
                      onClick={onClose}>&times;</span>
                <h2 className="text-xl font-semibold mb-4">Confirm Order</h2>
                <ul className="mb-4">
                    {cart.map((item, index) => (
                        <li key={index} className="mb-2">
                            {item.quantity} x {item.name} - ${(item.price * item.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <div className="mb-4">
                    <input type="text" placeholder="Name" value={customerName}
                           onChange={(e) => setCustomerName(e.target.value)}
                           className="input input-bordered w-full mb-2"/>
                    <input type="email" placeholder="Email" value={customerEmail}
                           onChange={(e) => setCustomerEmail(e.target.value)}
                           className="input input-bordered w-full mb-2"/>
                    <input type="text" placeholder="Phone" value={customerPhone}
                           onChange={(e) => setCustomerPhone(e.target.value)}
                           className="input input-bordered w-full mb-2"/>
                    <input type="text" placeholder="Address" value={customerAddress}
                           onChange={(e) => setCustomerAddress(e.target.value)}
                           className="input input-bordered w-full mb-2"/>
                    <input type="date" placeholder="Delivery Date" value={deliveryDate}
                           onChange={(e) => setDeliveryDate(e.target.value)}
                           className="input input-bordered w-full mb-2"/>
                </div>
                <button onClick={handleCreateOrderWrapper} className="btn btn-primary">Create Order</button>
            </div>
        </div>
    );
};

export default OrderPopup;