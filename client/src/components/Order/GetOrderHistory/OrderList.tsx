import React from "react";
import OrderItem from "./OrderItem.tsx";

interface OrderListProps {
    orders: any[];
    customers: { [key: string]: string };
    papers: any[];
    searchQuery: string;
}

const OrderList: React.FC<OrderListProps> = ({ orders, customers, papers, searchQuery }) => {
    const filteredOrders = orders.filter(order => {
        const customerName = customers[order.customerId?.toString() ?? ""] || "";
        return (
            order.id?.toString().includes(searchQuery) ||
            customerName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <ul className="mr-8 ml-8 space-y-4">
            {filteredOrders.map((order) => (
                <OrderItem key={order.id} order={order} customers={customers} papers={papers} />
            ))}
        </ul>
    );
};

export default OrderList;