import { useFetchAllOrders } from "../../Hooks/useFetchAllOrders.ts";
import { useFetchAllCustomers } from "../../Hooks/useFetchAllCustomers.ts";

const GetAllOrders = () => {
    const { orders, loading: ordersLoading, error: ordersError } = useFetchAllOrders();
    const { customers, error: customersError } = useFetchAllCustomers();

    if (ordersLoading) return <div>Loading...</div>;
    if (ordersError) return <div>Error: {ordersError}</div>;
    if (customersError) return <div>Error: {customersError}</div>;

    const getCustomerName = (customerId) => {
        const customer = customers.find(c => c.id === customerId.toString());
        return customer ? customer.name : "Unknown";
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            <div className="flex flex-wrap gap-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md w-48">
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Total Amount:</strong> {order.totalAmount}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Order Date:</strong> {order.orderDate}</p>
                        <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                        <p><strong>Customer Name:</strong> {getCustomerName(order.customerId)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetAllOrders;