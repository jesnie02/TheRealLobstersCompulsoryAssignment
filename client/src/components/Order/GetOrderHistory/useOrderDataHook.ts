import {useAtom} from "jotai";
import {OrdersAtom} from "../../../Atoms/OrdersAtom.tsx";
import {useCallback, useEffect, useState} from "react";
import {PapersAtom} from "../../../Atoms/PapersAtom.tsx";
import {Api} from "../../../Api.ts";


export const useOrderData = () => {
    const [orders, setOrders] = useAtom(OrdersAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customers, setCustomers] = useState<{ [key: string]: string }>({});
    const [papers, setPapers] = useAtom(PapersAtom);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const api = new Api();
            const response = await api.api.orderGetAllOrders();
            if (response.status !== 200) {
                throw new Error("Failed to fetch orders");
            }

            setOrders(response.data);
            localStorage.setItem("Orders", JSON.stringify(response.data));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [setOrders]);

    const fetchCustomer = useCallback(async (customerId: number) => {
        try {
            const api = new Api();
            const response = await api.api.orderGetOrderHistory(customerId);
            if (response.status === 200) {
                const customerOrders = response.data;
                const customerName = customerOrders.length > 0 ? customerOrders[0].customer?.name : "Unknown";
                setCustomers(prev => ({ ...prev, [customerId]: customerName }));
            }
        } catch (err: any) {
            console.error(`Failed to fetch customer ${customerId}:`, err.message);
        }
    }, []);

    const fetchPapers = useCallback(async () => {
        setLoading(true);
        try {
            const api = new Api();
            const response = await api.api.paperGetAllPapers();
            if (response.status !== 200) throw new Error("Failed to fetch papers");

            setPapers(response.data);
            localStorage.setItem("papers", JSON.stringify(response.data));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [setPapers]);

    useEffect(() => {
        fetchOrders();
        fetchPapers();
    }, [fetchOrders, fetchPapers]);

    useEffect(() => {
        orders.forEach(order => {
            const customerId = order.customerId;
            if (customerId && !customers[customerId.toString()]) {
                fetchCustomer(customerId);
            }
        });
    }, [orders, customers, fetchCustomer]);

    return { orders, loading, error, customers, papers };
};