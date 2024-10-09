import { useState, useEffect } from 'react';
import { Api, OrderEntryDto } from '../Api';

const useFetchAllOrderEntries = () => {
    const [orderEntries, setOrderEntries] = useState<OrderEntryDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderEntries = async () => {
            try {
                const response = await new Api().api.orderGetOrderEntries();
                setOrderEntries(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderEntries();
    }, []);

    return { orderEntries, loading, error };
};

export default useFetchAllOrderEntries;