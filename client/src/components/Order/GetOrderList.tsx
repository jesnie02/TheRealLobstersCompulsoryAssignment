import React from "react";
import GetOrderHistoryItem from "./GetOrderHistoryItem.tsx";

interface OrderListProps {
    orders: any[];
    customers: { [key: string]: string };
    papers: any[];
    searchQuery: string;
}

class GetOrderList extends React.Component<OrderListProps> {
    render() {
        let { orders, customers, papers, searchQuery } = this.props;
        const filteredOrders = orders.filter(order => {
            const customerName = customers[order.customerId?.toString() ?? ""] || "";
            return (
                order.id?.toString().includes(searchQuery) ||
                customerName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });

        return (
            <ul className="flex flex-wrap">
                {filteredOrders.map((order) => (
                    <GetOrderHistoryItem key={order.id} order={order} customers={customers} papers={papers} />
                ))}
            </ul>
        );
    }
}

export default GetOrderList;