import { useState, useEffect } from 'react';
import { http } from '../http';
import {OrderDto} from "../Api.ts";

export const useFetchOrdersByCustomerId = (customerId: number) => {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await http.api.customerGetOrdersByCustomerId(customerId);
                if (response.status !== 200) throw new Error("Orders not found");

                setOrders(response.data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, [customerId]);

    return { orders, error };
};