import { useFetchAllOrders } from "../../Hooks/useFetchAllOrders";
import { useFetchAllCustomers } from "../../Hooks/useFetchAllCustomers";
import StatusBadge from "../Utilities/StatusBadge.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GetAllOrders = () => {
    const { orders, loading: ordersLoading, error: ordersError } = useFetchAllOrders();
    const { customers, error: customersError } = useFetchAllCustomers();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    if (ordersLoading) return <div>Loading...</div>;
    if (ordersError) return <div>Error: {ordersError}</div>;
    if (customersError) return <div>Error: {customersError}</div>;

    const getCustomerName = (customerId: any) => {
        const customer = customers.find(c => c.id === customerId.toString());
        return customer ? customer.name : "Unknown";
    };

    const handleRowDoubleClick = (orderId: number) => {
        navigate(`/order/${orderId}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredOrders = orders
        .filter(order => order !== undefined)
        .filter(order => {
            const customerName = getCustomerName(order.customerId)?.toLowerCase() ?? "unknown";
            const query = searchQuery.toLowerCase();
            return (
                order.status?.toLowerCase().includes(query) ||
                (order.deliveryDate && new Date(order.deliveryDate).toLocaleDateString().includes(query)) ||
                (order.orderDate && new Date(order.orderDate).toLocaleDateString().includes(query)) ||
                (order.totalAmount && order.totalAmount.toString().includes(query)) ||
                customerName.includes(query) ||
                order.id?.toString().includes(query)
            );
        });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Order ID, Customer Name, Status, etc."
                    className="input input-bordered w-full"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Order ID</th>
                        <th className="py-2 px-4 border-b text-left">Customer Name</th>
                        <th className="py-2 px-4 border-b text-left">Total Amount</th>
                        <th className="py-2 px-4 border-b text-left">Order Date</th>
                        <th className="py-2 px-4 border-b text-left">Delivery Date</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-100"
                            onDoubleClick={() => handleRowDoubleClick(order.id!)}>
                            <td className="py-2 px-4 border-b">{order.id}</td>
                            <td className="py-2 px-4 border-b">{getCustomerName(order.customerId)}</td>
                            <td className="py-2 px-4 border-b">{order.totalAmount ? order.totalAmount.toFixed(2) : "N/A"}</td>
                            <td className="py-2 px-4 border-b">{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}</td>
                            <td className="py-2 px-4 border-b">{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "N/A"}</td>
                            <td className="py-2 px-4 border-b"><StatusBadge status={order.status ?? "Unknown"}/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetAllOrders;