import { useFetchAllOrders } from '../../Hooks/useFetchAllOrders.ts';
import { useFetchCustomerOrderHistory } from '../../Hooks/useFetchCustomerOrderHistory.ts';
import { useFetchAllPapers } from '../../Hooks/useFetchAllPapers.ts';
import SearchBar from "../Utilities/SearchBar.tsx";
import GetOrderList from "./GetOrderList.tsx";
import {useEffect, useState} from "react";

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