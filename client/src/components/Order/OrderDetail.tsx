import { useParams } from 'react-router-dom';
import {useFetchOrderById} from "../../Hooks/useFetchGetOrderById.ts";


const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { order, loading, error } = useFetchOrderById(orderId ?? '');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p>Order ID: {order?.id}</p>
            <p>Customer ID: {order?.customerId}</p>
            <p>Total Amount: {order?.totalAmount}</p>
            <p>Order Date: {order?.orderDate}</p>
            <p>Delivery Date: {order?.deliveryDate}</p>
            <p>Status: {order?.status}</p>
            {/* Add more order details as needed */}
        </div>
    );
};

export default OrderDetail;