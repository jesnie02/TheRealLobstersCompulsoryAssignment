import React from 'react';
import useCancelOrder from "../../Hooks/useCancelOrder.ts";


interface CancelOrderButtonProps {
    orderId: number;
}

const CancelOrderButton: React.FC<CancelOrderButtonProps> = ({ orderId }) => {
    const { cancelOrder, loading, error } = useCancelOrder();

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            cancelOrder(orderId);
        }
    };

    return (
        <div>
            <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-3 py-1 rounded"
                disabled={loading}
            >
                {loading ? 'Cancelling...' : 'Cancel Order'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default CancelOrderButton;