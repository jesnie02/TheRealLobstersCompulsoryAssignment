import { useNavigate, useParams } from 'react-router-dom';
import { useFetchOrderById } from '../../Hooks/useFetchGetOrderById.ts';
import { useFetchAllPapers } from '../../Hooks/useFetchAllPapers.ts';
import { useFetchCustomerById } from '../../Hooks/useFetchCustomerById.ts';
import { OrderEntry } from "../../Api.ts";
import CancelOrderButton from "../Utilities/CancelOrderButton.tsx";
import StatusBadge from "../Utilities/StatusBadge.tsx";
import OrderStatusSelect from "../Utilities/OrderStatusSelect.tsx";


const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const { order, loading: orderLoading, error: orderError } = useFetchOrderById(orderId ?? '');
    const { papers, loading: papersLoading, error: papersError } = useFetchAllPapers();
    const { customer, loading: customerLoading, error: customerError } = useFetchCustomerById(order?.customerId ?? 0);

    if (orderLoading || papersLoading || customerLoading) return <div>Loading...</div>;
    if (orderError) return <div>Error: {orderError}</div>;
    if (papersError) return <div>Error: {papersError}</div>;
    if (customerError) return <div>Error: {customerError}</div>;

    const getPaperDetails = (productId: number) => {
        return papers.find(paper => paper.id === productId);
    };

    const calculateTotals = (orderEntries: OrderEntry[] | undefined) => {
        if (!orderEntries) return { totalQuantity: 0, totalPrice: 0 };
        return orderEntries.reduce(
            (totals, entry) => {
                const paper = getPaperDetails(entry.productId!);
                const price = paper?.price ?? 0;
                totals.totalQuantity += entry.quantity ?? 0;
                totals.totalPrice += (entry.quantity ?? 0) * price;
                return totals;
            },
            { totalQuantity: 0, totalPrice: 0 }
        );
    };

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
                    <div><strong>Shipping Method:</strong></div>
                    <div><strong>Payment Method:</strong></div>
                    <div><strong>Status:</strong> <StatusBadge status={order?.status ?? "Unknown"}/></div>
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

            {/* Order Entries */}
            <h3 className="text-2xl font-bold mt-6 mb-4">Order Entries</h3>
            <table className="min-w-full bg-white rounded-lg shadow border">
                <thead>
                <tr>
                <th className="py-2 px-4 border-b text-left">Product Name</th>
                    <th className="py-2 px-4 border-b text-left">Unit Price</th>
                    <th className="py-2 px-4 border-b text-left">Quantity</th>
                </tr>
                </thead>
                <tbody>
                {order?.orderEntries?.map(entry => {
                    const paper = getPaperDetails(entry.productId!);
                    return (
                        <tr key={entry.productId} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{paper?.name ?? 'N/A'}</td>
                            <td className="py-2 px-4 border-b">${paper?.price ?? 'N/A'}</td>
                            <td className="py-2 px-4 border-b">{entry.quantity}</td>
                        </tr>
                    );
                })}
                <tr className="font-bold">
                    <td className="py-2 px-4 border-b">Totals</td>
                    <td className="py-2 px-4 border-b"></td>
                    <td className="py-2 px-4 border-b">{calculateTotals(order?.orderEntries).totalQuantity}</td>
                    <td className="py-2 px-4 border-b">${calculateTotals(order?.orderEntries).totalPrice}</td>
                </tr>
                </tbody>
            </table>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
                <button
                    onClick={handleBackClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Go Back
                </button>
                {order && <CancelOrderButton orderId={order.id!}/>}
                <OrderStatusSelect/>
            </div>
        </div>
    );
};

export default OrderDetail;