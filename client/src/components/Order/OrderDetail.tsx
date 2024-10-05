import { useParams } from 'react-router-dom';
import { useFetchOrderById } from '../../Hooks/useFetchGetOrderById.ts';
import { useFetchAllPapers } from '../../Hooks/useFetchAllPapers.ts';

const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const { order, loading: orderLoading, error: orderError } = useFetchOrderById(orderId ?? '');
    const { papers, loading: papersLoading, error: papersError } = useFetchAllPapers();

    if (orderLoading || papersLoading) return <div>Loading...</div>;
    if (orderError) return <div>Error: {orderError}</div>;
    if (papersError) return <div>Error: {papersError}</div>;

    const getPaperDetails = (productId: number) => {
        return papers.find(paper => paper.id === productId);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p>Order ID: {order?.id}</p>
            <p>Customer ID: {order?.customerId}</p>
            <p>Total Amount: {order?.totalAmount}</p>
            <p>Order Date: {order?.orderDate}</p>
            <p>Delivery Date: {order?.deliveryDate}</p>
            <p>Status: {order?.status}</p>
            <h3 className="text-xl font-bold mt-4">Order Entries</h3>
            <table className="min-w-full bg-white border">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b text-left">Product ID</th>
                    <th className="py-2 px-4 border-b text-left">Product Name</th>
                    <th className="py-2 px-4 border-b text-left">Quantity</th>
                    <th className="py-2 px-4 border-b text-left">Price</th>
                </tr>
                </thead>
                <tbody>
                {order?.orderEntries?.map(entry => {
                    const paper = getPaperDetails(entry.productId!);
                    return (
                        <tr key={entry.productId} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{entry.productId}</td>
                            <td className="py-2 px-4 border-b">{paper?.name ?? 'N/A'}</td>
                            <td className="py-2 px-4 border-b">{entry.quantity}</td>
                            <td className="py-2 px-4 border-b">{paper?.price ?? 'N/A'}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetail;