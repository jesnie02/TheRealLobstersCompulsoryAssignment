import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { OrdersAtom } from '../Atoms/OrdersAtom.tsx';
import { http } from '../http.ts';

export const useFetchAllOrders = () => {
    const [orders, setOrders] = useAtom(OrdersAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const response = await http.api.orderGetAllOrders();
            if (response.status !== 200) throw new Error("Failed to fetch orders");

            setOrders(response.data);
            localStorage.setItem("Orders", JSON.stringify(response.data));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [setOrders]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { orders, loading, error };
};