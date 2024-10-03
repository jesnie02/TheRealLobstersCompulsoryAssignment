import { useState, useCallback } from 'react';
import { http } from '../http.ts';

export const useFetchCustomerOrderHistory = () => {
    const [customers, setCustomers] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);

    const fetchCustomer = useCallback(async (customerId: number) => {
        try {
            const response = await http.api.orderGetOrderHistory(customerId);
            if (response.status === 200) {
                const customerOrders = response.data;
                const customerName = customerOrders.length > 0 ? customerOrders[0].customer?.name : "Unknown";
                setCustomers(prev => ({ ...prev, [customerId]: customerName }));
            }
        } catch (err: any) {
            setError(err.message);
        }
    }, []);

    return { customers, error, fetchCustomer };
};