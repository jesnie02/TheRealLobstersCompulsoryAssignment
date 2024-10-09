import { useState, useEffect } from 'react';
import { http } from '../http.ts';
import { Customer } from '../Api.ts';

export const useFetchCustomerById = (customerId: number) => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await http.api.customerGetCustomerById(customerId);
                setCustomer(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (customerId) {
            fetchCustomer();
        }
    }, [customerId]);

    return { customer, loading, error };
};