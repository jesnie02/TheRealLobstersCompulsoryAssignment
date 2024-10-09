import React from 'react';
import useCancelOrder from "../../Hooks/useCancelOrder.ts";

interface CancelOrderButtonProps {
    orderId: number;
    status: string;
}

const CancelOrderButton: React.FC<CancelOrderButtonProps> = ({ orderId, status }) => {
    const { cancelOrder, loading, error } = useCancelOrder();

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            cancelOrder(orderId);
        }
    };

    const isDisabled = loading || ["shipped", "delivered", "cancelled"].includes(status.toLowerCase());

    return (
        <div>
            <button
                onClick={handleCancel}
                className={`px-4 py-2 rounded-lg text-white ${isDisabled ? 'bg-gray-500' : 'bg-red-500'}`}
                disabled={isDisabled}
            >
                {loading ? 'Cancelling...' : 'Cancel Order'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default CancelOrderButton;