import React from 'react';

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'cancelled':
                return <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Cancelled</span>;
            case 'delivered':
                return <span className="bg-green-100 text-green-600 px-2 py-1 rounded">Delivered</span>;
            case 'pending':
                return <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Pending</span>;
            case 'booked':
                return <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">Booked</span>;
            case 'shipped':
                return <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">Shipped</span>;
            default:
                return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">{status}</span>;
        }
    };

    return getStatusBadge(status);
};

export default StatusBadge;