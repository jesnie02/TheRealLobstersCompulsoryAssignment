import React, {useEffect, useState} from "react";
import { useFetchAllOrders } from '../../../Hooks/useFetchAllOrders';
import { useFetchCustomerOrderHistory } from '../../../Hooks/useFetchCustomerOrderHistory';
import { useFetchAllPapers } from '../../../Hooks/useFetchAllPapers';
import SearchBar from "../../Utilities/SearchBar.tsx";
import A4CopyPaper from "/assets/PaperImages/A4CopyPaper.jpg";

interface OrderItemProps {
    order: any;
    customers: { [key: string]: string };
    papers: any[];
}

const GetOrderHistoryItem: React.FC<OrderItemProps> = ({ order, customers, papers }) => {
    return (
        <li className="card p-2 border m-1 border-gray-200 rounded-lg shadow-md w-1/3">
            <div className="flex justify-between mb-2">
                <p className="text-md font-bold">Order # {order.id}</p>
                <p className="text-sm">Order date: {order.orderDate}</p>
            </div>

            {order.orderEntries?.map((paperProduct: any, index: number) => {
                const paper = papers.find(p => p.id === paperProduct.productId);
                return (
                    <div key={index} className="flex border-t py-2">
                        <img
                            src={A4CopyPaper}
                            alt={`Product ${paperProduct.productId}`}
                            className="w-12 h-12 rounded mr-2"
                        />
                        <div className="w-full flex justify-between">
                            <div>
                                <p className="font-semibold text-sm">{paper?.name || "Unknown Paper"}</p>
                                <p className="text-xs text-gray-500">By: {customers[order.customerId?.toString() ?? ""] || "Loading..."}</p>
                                <p className="text-xs">Qty: {paperProduct.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs">Status: <span className={`text-${order.status === 'Delivered' ? 'green' : 'red'}-500`}>{order.status}</span></p>
                                <p className="text-xs">Delivery Expected by: {order.deliveryDate}</p>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="flex justify-between mt-2 pt-2 border-t">
                <button className="text-red-600 hover:underline text-xs">Cancel Order</button>
                <p className="font-bold text-sm">Total Price: ${order.totalAmount}</p>
            </div>
        </li>
    );
};

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

export default function GetAllOrder() {
    const { orders, loading, error } = useFetchAllOrders();
    const { customers, error: customerError, fetchCustomer } = useFetchCustomerOrderHistory();
    const { papers, error: paperError } = useFetchAllPapers();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        orders.forEach(order => {
            if (order.customerId !== undefined) {
                fetchCustomer(order.customerId);
            }
        });
    }, [orders, fetchCustomer]);

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Order History</h1>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {loading ? (
                <p>Loading...</p>
            ) : error || customerError || paperError ? (
                <p>Error: {error || customerError || paperError}</p>
            ) : orders && orders.length > 0 ? (
                <GetOrderList orders={orders} customers={customers} papers={papers} searchQuery={searchQuery} />
            ) : (
                <p>No orders available</p>
            )}
        </div>
    );
}