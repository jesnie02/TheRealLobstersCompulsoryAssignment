import React from 'react';
import StatusBadge from "./StatusBadge";
import usePatchOrderStatus from '../../Hooks/usePatchOrderStatus';

interface OrderStatusSelectProps {
    orderId: number;
    status: string;
    onChange: (status: string) => void;
}

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const OrderStatusSelect: React.FC<OrderStatusSelectProps> = ({ orderId, status, onChange }) => {
    const { patchOrderStatus, loading } = usePatchOrderStatus();

    const handleStatusChange = async (newStatus: string) => {
        try {
            await patchOrderStatus(orderId, newStatus);
            onChange(newStatus);
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    return (
        <select
            value={status ?? "Unknown"}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`bg-white border border-gray-300 rounded-lg px-4 py-2 ${status ? `status-${status.toLowerCase()}` : ''}`}
            disabled={loading}
        >
            {statusOptions.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                    <StatusBadge status={statusOption} />
                </option>
            ))}
        </select>
    );
};

export default OrderStatusSelect;