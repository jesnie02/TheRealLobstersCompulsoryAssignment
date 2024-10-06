import { useState } from 'react';
import {http} from "../http.ts";

const useCancelOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cancelOrder = async (orderId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await http.api.orderDeleteOrder(orderId);
            if (response.status === 200) {
                alert(`Order ${orderId} has been canceled successfully.`);
            } else {
                alert(`Failed to cancel order ${orderId}.`);
            }
        } catch (error) {
            console.error('Error canceling order:', error);
            setError(`An error occurred while canceling order ${orderId}.`);
        } finally {
            setLoading(false);
        }
    };

    return { cancelOrder, loading, error };
};

export default useCancelOrder;