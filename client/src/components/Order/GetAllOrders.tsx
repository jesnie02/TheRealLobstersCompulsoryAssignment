import { useFetchAllOrders } from "../../Hooks/useFetchAllOrders";
import { useFetchAllCustomers } from "../../Hooks/useFetchAllCustomers";
import CancelOrderButton from "../Utilities/CancelOrderButton.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetAllOrders = () => {
    const { orders, loading: ordersLoading, error: ordersError } = useFetchAllOrders();
    const { customers, error: customersError } = useFetchAllCustomers();
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10; // Show 10 orders per page

    if (ordersLoading) return <div>Loading...</div>;
    if (ordersError) return <div>Error: {ordersError}</div>;
    if (customersError) return <div>Error: {customersError}</div>;

    const getCustomerName = (customerId: any) => {
        const customer = customers.find(c => c.id === customerId.toString());
        return customer ? customer.name : "Unknown";
    };

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Get the orders for the current page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'Cancelled':
                return <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Cancelled</span>;
            case 'Booked':
                return <span className="bg-green-100 text-green-600 px-2 py-1 rounded">Booked</span>;
            case 'Delayed':
                return <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Delayed</span>;
            default:
                return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">{status}</span>;
        }
    };

    const handleRowDoubleClick = (orderId: number) => {
        navigate(`/order/${orderId}`);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>

            {/* Table Structure */}
            <table className="min-w-full bg-white border">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b text-left">Order ID</th>
                    <th className="py-2 px-4 border-b text-left">Customer Name</th>
                    <th className="py-2 px-4 border-b text-left">Total Amount</th>
                    <th className="py-2 px-4 border-b text-left">Order Date</th>
                    <th className="py-2 px-4 border-b text-left">Delivery Date</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                    <th className="py-2 px-4 border-b text-left">Cancel Order</th>
                </tr>
                </thead>
                <tbody>
                {currentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-100"
                        onDoubleClick={() => handleRowDoubleClick(order.id!)}>
                        <td className="py-2 px-4 border-b">{order.id}</td>
                        <td className="py-2 px-4 border-b">{getCustomerName(order.customerId)}</td>
                        <td className="py-2 px-4 border-b">{order.totalAmount}</td>
                        <td className="py-2 px-4 border-b">{order.orderDate}</td>
                        <td className="py-2 px-4 border-b">{order.deliveryDate}</td>
                        <td className="py-2 px-4 border-b">{renderStatusBadge(order.status ?? "Unknown")}</td>
                        <td className="py-2 px-4 border-b"><CancelOrderButton orderId={order.id!}/></td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 bg-gray-200 px-3 py-1 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastOrder >= orders.length}
                    className="bg-gray-200 px-3 py-1 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GetAllOrders;