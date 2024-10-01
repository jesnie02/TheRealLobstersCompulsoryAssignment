import React from 'react';
import A4CopyPaper from '/assets/PaperImages/A4CopyPaper.jpg';

interface OrderItemProps {
    order: any;
    customers: { [key: string]: string };
    papers: any[];
}

const OrderItem: React.FC<OrderItemProps> = ({ order, customers, papers }) => {
    return (
        <li className="card p-4 border m-1.5 border-gray-200 rounded-lg shadow-md ">
            <div className="flex justify-between mb-4">
                <p className="text-lg font-bold">Order # {order.id}</p>
                <p>Order date: {order.orderDate}</p>
            </div>

            {order.orderEntries?.map((paperProduct: any, index: number) => {
                const paper = papers.find(p => p.id === paperProduct.productId);
                return (
                    <div key={index} className="flex border-t py-4">
                        <img
                            src={A4CopyPaper}
                            alt={`Product ${paperProduct.productId}`}
                            className="w-16 h-16 rounded mr-4"
                        />
                        <div className="w-full flex justify-between">
                            <div>
                                <p className="font-semibold">{paper?.name || "Unknown Paper"}</p>
                                <p className="text-sm text-gray-500">By: {customers[order.customerId?.toString() ?? ""] || "Loading..."}</p>
                                <p className="text-sm">Qty: {paperProduct.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p>Status: <span className={`text-${order.status === 'Delivered' ? 'green' : 'red'}-500`}>{order.status}</span></p>
                                <p>Delivery Expected by: {order.deliveryDate}</p>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="flex justify-between mt-4 pt-4 border-t">
                <button className="text-red-600 hover:underline">Cancel Order</button>
                <p className="font-bold">Total Price: ${order.totalAmount}</p>
            </div>
        </li>
    );
};

export default OrderItem;