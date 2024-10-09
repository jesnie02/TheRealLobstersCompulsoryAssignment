import React from 'react';
import { OrderEntry } from "../../Api.ts";

interface OrderEntriesTableProps {
    orderEntries: OrderEntry[] | undefined;
    papers: any[];
    calculateTotals: (orderEntries: OrderEntry[] | undefined) => { totalQuantity: number, totalPrice: number };
}

const OrderEntriesTable: React.FC<OrderEntriesTableProps> = ({ orderEntries, papers, calculateTotals }) => {
    const getPaperDetails = (productId: number) => {
        return papers.find(paper => paper.id === productId);
    };

    return (
        <div>
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
                {orderEntries?.map(entry => {
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
                    <td className="py-2 px-4 border-b">${calculateTotals(orderEntries).totalPrice}</td>
                    <td className="py-2 px-4 border-b">{calculateTotals(orderEntries).totalQuantity}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderEntriesTable;