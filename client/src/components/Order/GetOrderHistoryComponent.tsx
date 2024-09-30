import { useAtom } from "jotai";
import { OrdersAtom } from "../../Atoms/OrdersAtom.tsx";
import { useCallback, useState, useEffect } from "react";
import { Api } from "../../Api.ts";

export default function GetAllOrdersComponent() {
    const [orders, setOrders] = useAtom(OrdersAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customers, setCustomers] = useState<{ [key: string]: string }>({});

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

    const fetchCustomer = useCallback(async (customerId: string) => {
        try {
            const api = new Api();
            const response = await api.api.customerGetCustomerById(customerId);
            if (response.status === 200) {
                setCustomers(prev => ({ ...prev, [customerId]: response.data.name }));
            }
        } catch (err: any) {
            console.error(`Failed to fetch customer ${customerId}:`, err.message);
        }
    }, []);

    useEffect(() => {
        const storedOrders = localStorage.getItem("Orders");
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        } else {
            fetchOrders();
        }
    }, [fetchOrders, setOrders]);

    useEffect(() => {
        orders.forEach(order => {
            if (!customers[order.customerId]) {
                fetchCustomer(order.customerId);
            }
        });
    }, [orders, customers, fetchCustomer]);

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Order History</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : orders && orders.length > 0 ? (
                <ul className="order-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-item order-box">
                            <h2>Order ID: {order.id}</h2>
                            <p>Order date: {order.orderDate}</p>
                            <p>Delivery date: {order.deliveryDate}</p>
                            <p>Customer: {customers[order.customerId] || "Loading..."}</p>
                            <p>Total: ${order.totalAmount}</p>
                            <p>Status: {order.status}</p>
                            <p>Order entries:</p>
                            <ul>
                                {order.orderEntries?.map((entry, index) => (
                                    <li key={index}>
                                        <p>Product: {entry.productId}</p>
                                        <p>Quantity: {entry.quantity}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders available</p>
            )}
        </div>
    );
}