import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { CustomersAtom } from '../Atoms/CustomersAtom.tsx';
import { http } from '../http.ts';

export const useFetchAllCustomers = () => {
    const [customers, setCustomers] = useAtom(CustomersAtom);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await http.api.customerGetCustomers();
                const customersWithStringId = response.data.map((customer: any) => ({
                    ...customer,
                    id: customer.id.toString(),
                }));
                setCustomers(customersWithStringId);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchCustomers();
    }, [setCustomers]);

    return { customers, error };
};