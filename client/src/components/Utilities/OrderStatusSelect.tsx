import React from 'react';
import StatusBadge from "./StatusBadge.tsx";


interface OrderStatusSelectProps {
    status: string;
    onChange: (status: string) => void;
}

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const OrderStatusSelect: React.FC<OrderStatusSelectProps> = ({ status, onChange }) => {
    return (
        <select
            value={status ?? "Unknown"}
            onChange={(e) => onChange(e.target.value)}
            className={`bg-white border border-gray-300 rounded-lg px-4 py-2 ${status ? `status-${status.toLowerCase()}` : ''}`}
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