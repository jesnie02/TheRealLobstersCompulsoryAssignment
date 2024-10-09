import { OrderEntryDto } from '../../Api';
import useFetchAllOrderEntries from '../../Hooks/useFetchAllOrderEntries';
import { useFetchAllPapers } from '../../Hooks/useFetchAllPapers';
import { useFetchOrderById } from '../../Hooks/useFetchGetOrderById';

interface OrderEntriesTableProps {
    orderId: number;
}

const OrderEntriesTable: React.FC<OrderEntriesTableProps> = ({ orderId }) => {
    // Validate orderId
    if (!orderId || orderId === 0) {
        return <p className="text-red-500 mt-4">Invalid Order ID</p>;
    }

    const { orderEntries, loading: entriesLoading, error: entriesError } = useFetchAllOrderEntries();
    const { papers, loading: papersLoading, error: papersError } = useFetchAllPapers();
    const { loading: orderLoading, error: orderError } = useFetchOrderById(orderId.toString());

    if (entriesLoading || papersLoading || orderLoading) {
        return <p>Loading...</p>;
    }

    if (entriesError) {
        return <p className="text-red-500 mt-4">{entriesError}</p>;
    }

    if (papersError) {
        return <p className="text-red-500 mt-4">{papersError}</p>;
    }

    if (orderError) {
        return <p className="text-red-500 mt-4">{orderError}</p>;
    }

    const filteredEntries = orderEntries.filter(entry => entry.orderId === orderId);

    const calculateTotals = (orderEntries: OrderEntryDto[]) => {
        const totalQuantity = orderEntries.reduce((sum, entry) => sum + (entry.quantity ?? 0), 0);
        const totalPrice = orderEntries.reduce((sum, entry) => {
            const paper = papers.find(paper => paper.id === entry.productId);
            const price = paper?.price ?? 0;
            return sum + (entry.quantity ?? 0) * price;
        }, 0);
        return { totalQuantity, totalPrice };
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mt-6 mb-4">Order Entries</h3>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">Product</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Total</th>
                </tr>
                </thead>
                <tbody>
                {filteredEntries.map(entry => {
                    const paper = papers.find(paper => paper.id === entry.productId);
                    const price = paper?.price ?? 0;
                    return (
                        <tr key={entry.id}>
                            <td className="py-2">{paper?.name ?? 'Unknown'}</td>
                            <td className="py-2">{entry.quantity ?? 0}</td>
                            <td className="py-2">${price.toFixed(2)}</td>
                            <td className="py-2">${((entry.quantity ?? 0) * price).toFixed(2)}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="mt-4">
                <strong>Total Quantity:</strong> {calculateTotals(filteredEntries).totalQuantity}
                <br />
                <strong>Total Price:</strong> ${calculateTotals(filteredEntries).totalPrice.toFixed(2)}
            </div>
        </div>
    );
};

export default OrderEntriesTable;