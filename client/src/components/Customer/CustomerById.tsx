import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http} from '../../http.ts';
import {OrderDto} from "../../Api.ts"; // Ensure OrderDto is imported from the correct module

const CustomerById = () => {
    const { id } = useParams<{ id: string }>();
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const customerId = parseInt(id as string, 10);
                const response = await http.api.customerGetOrdersByCustomerId(customerId);
                if (response.status !== 200) throw new Error("Orders not found");

                setOrders(response.data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, [id]);

    return (
        <div className="flex flex-col items-center mt-16">
            <h1 className="menu-title text-5xl m-5 mt-12 mb-12">Customer Orders</h1>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <ul className="list-disc">
                {orders.map((order) => (
                    <li key={order.id} className="mb-4">
                        <h2 className="font-bold">Order ID: {order.id}</h2>
                        <p className="font-bold">Order Date: {order.deliveryDate}</p>
                        <p className="font-bold">Total: {order.status}</p>
                        <p className="font-bold">Status: {order.totalAmount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerById;