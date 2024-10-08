import React, { useState } from 'react';
import StatusBadge from "./StatusBadge";
import usePatchOrderStatus from '../../Hooks/usePatchOrderStatus';

interface OrderStatusSelectProps {
    orderId: number;
    status: string;
    onChange: (status: string) => void;
}

const statusOptions = ["Pending", "Booked", "Shipped", "Delivered", "Cancelled"];

const OrderStatusSelect: React.FC<OrderStatusSelectProps> = ({ orderId, status, onChange }) => {
    const { patchOrderStatus, loading } = usePatchOrderStatus();
    const [isOpen, setIsOpen] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        try {
            await patchOrderStatus(orderId, newStatus);
            onChange(newStatus);
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => !loading && status !== "Cancelled" && setIsOpen(!isOpen)}
                className={`bg-white px-4 py-2 bg-opacity-0 ${status ? `status-${status.toLowerCase()}` : ''}`}
                disabled={loading || status === "Cancelled"} //dissable badge sellect if order is originally cancelled
            >
                <StatusBadge status={status} />
                <span className="ml-2">&#9662;</span> {/* Unicode down arrow */}
            </button>
            {isOpen && (
                <ul className="absolute border border-gray-300 rounded-lg mt-1 w-full z-10 bg-white">
                    {statusOptions
                        .filter(statusOption => statusOption !== "Cancelled")
                        .map((statusOption) => (
                            <li
                                key={statusOption}
                                onClick={() => handleStatusChange(statusOption)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 bg-opacity-0"
                            >
                                <StatusBadge status={statusOption}/>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default OrderStatusSelect;