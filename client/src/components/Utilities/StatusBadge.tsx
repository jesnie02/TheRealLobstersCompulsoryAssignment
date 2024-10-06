import React from 'react';

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Cancelled':
                return <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Cancelled</span>;
            case 'Booked':
                return <span className="bg-green-100 text-green-600 px-2 py-1 rounded">Booked</span>;
            case 'Delayed':
                return <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Delayed</span>;
            default:
                return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">{status}</span>;
        }
    };

    return getStatusBadge(status);
};

export default StatusBadge;