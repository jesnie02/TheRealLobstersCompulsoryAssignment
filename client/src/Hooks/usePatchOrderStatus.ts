import { useState } from 'react';
import { http } from "../http.ts";

const usePatchOrderStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const patchOrderStatus = async (orderId: number, newStatus: string) => {
        setLoading(true);
        setError(null);
        try {
            const updatedOrder = await http.api.orderUpdateOrderStatus(orderId, { status: newStatus });
            setLoading(false);
            return updatedOrder;
        } catch (err) {
            setError('Failed to update order status');
            setLoading(false);
            throw err;
        }
    };

    return { patchOrderStatus, loading, error };
};

export default usePatchOrderStatus;