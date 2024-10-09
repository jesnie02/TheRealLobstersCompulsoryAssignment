import { useNavigate, useParams } from 'react-router-dom';
import { useFetchOrderById } from '../../Hooks/useFetchGetOrderById.ts';
import { useFetchCustomerById } from '../../Hooks/useFetchCustomerById.ts';
import CancelOrderButton from "../Utilities/CancelOrderButton.tsx";
import StatusBadge from "../Utilities/StatusBadge.tsx";
import OrderStatusSelect from "../Utilities/OrderStatusSelect.tsx";
import OrderEntriesTable from '../Order/OrderEntriesTable.tsx';
import { useEffect, useState } from 'react';

const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const { order, loading: orderLoading, error: orderError } = useFetchOrderById(orderId ?? '');
    const { customer, loading: customerLoading, error: customerError } = useFetchCustomerById(order?.customerId ?? 0);
    const [orderStatus, setOrderStatus] = useState(order?.status ?? '');

    useEffect(() => {
        if (order) {
            setOrderStatus(order.status ?? '');
        }
    }, [order]);

    if (orderLoading || customerLoading) return <div>Loading...</div>;
    if (orderError) return <div>Error: {orderError}</div>;
    if (customerError) return <div>Error: {customerError}</div>;

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="p-6 bg-gray-100">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Order Details</h2>
            </div>

            {/* Main Order Information Section */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Customer Information */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-xl mb-2">Customer</h3>
                    <div><strong>Name:</strong> {customer?.name ?? 'N/A'}</div>
                    <div><strong>Email:</strong> {customer?.email ?? 'N/A'}</div>
                    <div><strong>Phone:</strong> {customer?.phone ?? 'N/A'}</div>
                </div>

                {/* Order Info */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-xl mb-2">Order Info</h3>
                    <div><strong>Shipping Method:</strong> FedEx</div>
                    <div><strong>Payment Method:</strong> Debit Card</div>
                    <div><strong>Status:</strong> <StatusBadge status={orderStatus}/></div>
                </div>

                {/* Payment Info */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div>
                        <h3 className="font-bold text-xl mb-2">Payment Info</h3>
                    </div>
                    <div className="flex justify-start mt-8">
                        <strong className="text-2xl">Card:</strong> <span className="text-4xl">**** ****</span>
                    </div>
                </div>
            </div>

            {/* Order Entries Table */}
            <OrderEntriesTable />

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
                <button
                    onClick={handleBackClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Go Back
                </button>
                {order && <CancelOrderButton orderId={order.id!} status={orderStatus} />}
                {order && <OrderStatusSelect orderId={order.id!} status={orderStatus} onChange={setOrderStatus} />}
            </div>
        </div>
    );
};

export default OrderDetail;