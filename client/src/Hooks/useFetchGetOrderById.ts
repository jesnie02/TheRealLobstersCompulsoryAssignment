import {useEffect, useState} from 'react';
import {OrderDto} from '../Models/modelIndex.ts';
import {useHttp} from "./hookIndex.ts";

const useFetchOrderById = (orderId: string) => {
    const [order, setOrder] = useState<OrderDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await useHttp().api.orderGetOrder(Number(orderId));
                setOrder(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    return {order, loading, error};
};

export default useFetchOrderById;