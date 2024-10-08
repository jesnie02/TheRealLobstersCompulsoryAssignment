import React, { useEffect, useState } from 'react';
import { OrderDto } from '../../Api.ts';
import CancelOrderButton from "../Utilities/CancelOrderButton.tsx";

interface OrderItemProps {
    order: OrderDto;
    onRemove: (orderId: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    console.log('Order:', order); // Debugging line
    console.log('Order Entries:', order.orderEntries); // Debugging line

    const [orderStatus, setOrderStatus] = useState(order?.status ?? '');

    useEffect(() => {
        if (order) {
            setOrderStatus(order.status ?? '');
        }
    }, [order]);

    return (
        <li className="cart-item p-4 bg-lightGray rounded-lg shadow-sm flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-semibold">Order ID: {order.id}</h2>
                <p className="text-lg">Order Date: {order.orderDate}</p>
                <p className="text-lg">Delivery Date: {order.deliveryDate}</p>
                <p className="text-lg">Total: ${order.totalAmount}</p>
                <p className="text-lg">Status: {order.status}</p>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Order Entries:</h3>
                    {order.orderEntries && order.orderEntries.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {order.orderEntries.map((entry, index) => (
                                <li key={index} className="text-lg">
                                    Product ID: {entry.productId}, Quantity: {entry.quantity}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-lg">No order entries available.</p>
                    )}
                </div>
            </div>
            {order && <CancelOrderButton orderId={order.id!} status={orderStatus} />}
        </li>
    );
};

export default OrderItem;