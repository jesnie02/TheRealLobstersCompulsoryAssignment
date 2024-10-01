import { useAtom } from "jotai";
import { OrdersAtom } from "../../Atoms/OrdersAtom.tsx";
import { Api } from "../../Api.ts";

import { PapersAtom } from "../../Atoms/PapersAtom.tsx";
import A4CopyPaper from '../../assets/PaperImages/A4CopyPaper.jpg';
import SearchBar from "../Utilities/SearchBar.tsx";
import {useCallback, useEffect, useState} from "react";


export default function GetAllOrdersComponent() {
    const [orders, setOrders] = useAtom(OrdersAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customers, setCustomers] = useState<{ [key: string]: string }>({});
    const [papers, setPapers] = useAtom(PapersAtom);
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredOrders = orders.filter(order => {
        const customerName = customers[order.customerId?.toString() ?? ""] || "";
        return (
            order.id?.toString().includes(searchQuery) ||
            customerName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Order History</h1>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : filteredOrders && filteredOrders.length > 0 ? (
                <ul className="mr-8 ml-8 space-y-4">
                    {filteredOrders.map((order) => (
                        <li key={order.id} className="card p-4 border m-1.5 border-gray-200 rounded-lg shadow-md ">
                            <div className="flex justify-between mb-4">
                                <p className="text-lg font-bold">Order # {order.id}</p>
                                <p>Order date: {order.orderDate}</p>
                            </div>

                            {order.orderEntries?.map((paperProduct, index) => {
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
                    ))}
                </ul>
            ) : (
                <p>No orders available</p>
            )}
        </div>
    );
}