import {useEffect, useState} from 'react';
import {useHttp} from "./hookIndex.ts";
import {OrderDto} from "../Models/modelIndex.ts";

const useFetchOrdersByCustomerId = (customerId: number) => {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await useHttp().api.customerGetOrdersByCustomerId(customerId);
                if (response.status !== 200) throw new Error("Orders not found");

                setOrders(response.data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, [customerId]);

    return {orders, error};
};

export default useFetchOrdersByCustomerId;