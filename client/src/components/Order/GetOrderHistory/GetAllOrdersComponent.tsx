import {useOrderData} from "./useOrderDataHook.ts";
import SearchBar from "../../Utilities/SearchBar.tsx";
import OrderList from "./OrderList.tsx";
import {useState} from "react";


export default function GetAllOrdersComponent() {
    const { orders, loading, error, customers, papers } = useOrderData();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Order History</h1>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : orders && orders.length > 0 ? (
                <OrderList orders={orders} customers={customers} papers={papers} searchQuery={searchQuery} />
            ) : (
                <p>No orders available</p>
            )}
        </div>
    );
}