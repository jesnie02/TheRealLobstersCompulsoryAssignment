import { useState, useEffect } from 'react';
import { http } from '../http.ts';
import { OrderDto } from '../Api.ts';

export const useFetchOrderById = (orderId: string) => {
    const [order, setOrder] = useState<OrderDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await http.api.orderGetOrder(Number(orderId));
                setOrder(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    return { order, loading, error };
};