import { useParams } from 'react-router-dom';
import { Api, CustomerDto, OrderEntryDto} from '../../Api.ts';
import { useFetchOrdersByCustomerId } from "../../Hooks/useFetchOrdersByCustomerId.ts";
import { useEffect, useState } from 'react';
import { useFetchAllPapers } from '../../Hooks/useFetchAllPapers.ts';
import OrderEntriesTable from '../Order/OrderEntriesTable.tsx';

const CustomerById = () => {
    const { id } = useParams<{ id: string }>();
    const customerId = parseInt(id as string, 10);
    const { orders, error: ordersError } = useFetchOrdersByCustomerId(customerId);
    const { papers, loading: papersLoading } = useFetchAllPapers();
    const [customer, setCustomer] = useState<CustomerDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);

    const imagesContext = import.meta.glob('/src/assets/RandomProfileImg/*.jpg');

    useEffect(() => {
        const loadImages = async () => {
            try {
                const imagePaths = Object.keys(imagesContext);
                if (imagePaths.length === 0) {
                    return;
                }
                const imageUrls = await Promise.all(imagePaths.map(path => imagesContext[path]().then(() => new URL(path, import.meta.url).href)));
                setImages(imageUrls);
            } catch (error) {
                console.error("Error loading images:", error);
            }
        };
        loadImages();
    }, []);

    const getRandomProfilePicture = () => {
        const defaultImage = '/assets/ProfilePictures/ProfileLogo.png';
        return images.length > 0 ? images[Math.floor(Math.random() * images.length)] : defaultImage;
    };

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await new Api().api.customerGetCustomerById(customerId);
                setCustomer(response.data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchCustomer();
    }, [customerId]);

    const calculateTotals = (orderEntries: OrderEntryDto[]) => {
        const totalQuantity = orderEntries.reduce((sum, entry) => sum + (entry.quantity ?? 0), 0);
        const totalPrice = orderEntries.reduce((sum, entry) => {
            const paper = papers.find(paper => paper.id === entry.productId);
            const price = paper?.price ?? 0;
            return sum + (entry.quantity ?? 0) * price;
        }, 0);
        return { totalQuantity, totalPrice };
    };

    if (error) {
        return <p className="text-red-500 mt-4">{error}</p>;
    }

    if (!customer || papersLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center mt-16">
            <div className="flex w-full max-w-5xl shadow-lg">
                {/* Left profile section */}
                <div className="w-1/3 bg-white p-8 border-r">
                    <div className="text-center">
                        <img
                            src={getRandomProfilePicture()}
                            alt="Customer Profile"
                            className="rounded-full w-32 h-32 mx-auto"
                        />
                        <h2 className="text-2xl font-bold mt-4">{customer.name}</h2>
                        <p className="text-gray-600">Customer</p>
                    </div>
                </div>

                {/* Right order details section */}
                <div className="w-2/3 bg-white p-8">
                    <h2 className="text-2xl font-bold">Official Information</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <p className="font-bold">Email</p>
                            <p className="text-gray-600">{customer.email}</p>
                        </div>
                        <div>
                            <p className="font-bold">Phone Number</p>
                            <p className="text-gray-600">{customer.phone}</p>
                        </div>
                        <div>
                            <p className="font-bold">Address</p>
                            <p className="text-gray-600">{customer.address}</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mt-8">Order History</h2>
                    <div className="mt-4 max-h-96 overflow-y-auto">
                        {ordersError && <p className="text-red-500 mt-4">{ordersError}</p>}
                        <ul className="cart-list space-y-4">
                            {orders
                                .filter(order => order.status !== 'cancelled')
                                .map((order) => (
                                    <li key={order.id} className="cart-item p-4 bg-lightGray rounded-lg shadow-sm flex justify-between items-center">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Order ID: {order.id}</h2>
                                            <p className="text-lg">Order Date: {order.orderDate}</p>
                                            <p className="text-lg">Delivery Date: {order.deliveryDate}</p>
                                            <p className="text-lg">Total: ${order.totalAmount}</p>
                                            <p className="text-lg">Status: {order.status}</p>
                                            <OrderEntriesTable
                                                orderId={order.id!}
                                                papers={papers}
                                                calculateTotals={calculateTotals}
                                            />
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className="card-actions justify-end mt-4">
                        <button className="btn btn-primary">Update Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerById;