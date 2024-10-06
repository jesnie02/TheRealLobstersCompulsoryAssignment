import { useParams } from 'react-router-dom';
import {useFetchOrdersByCustomerId} from "../../Hooks/useFetchOrdersByCustomerId.ts";


const CustomerById = () => {
    const { id } = useParams<{ id: string }>();
    const customerId = parseInt(id as string, 10);
    const { orders, error } = useFetchOrdersByCustomerId(customerId);

    return (
        <div className="flex flex-col items-center mt-16">
            <h1 className="menu-title text-5xl m-5 mt-12 mb-12">Customer Orders</h1>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Customer Orders</h2>
                    <ul className="list-disc">
                        {orders.map((order) => (
                            <li key={order.id} className="mb-4">
                                <h2 className="font-bold">Order ID: {order.id}</h2>
                                <p className="font-bold">Order Date: {order.orderDate}</p>
                                <p className="font-bold">Delivery Date {order.deliveryDate}</p>
                                <p className="font-bold">Total: {order.totalAmount}</p>
                                <p className="font-bold">Status: {order.status}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Update Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerById;