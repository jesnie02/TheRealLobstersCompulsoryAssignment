import { useParams } from 'react-router-dom';
import { Api, CustomerDto } from '../../Api.ts';
import { useFetchOrdersByCustomerId } from "../../Hooks/useFetchOrdersByCustomerId.ts";
import { useEffect, useState } from 'react';
import OrderEntriesTable from '../Order/OrderEntriesTable.tsx';
import CancelOrderButton from "../Utilities/CancelOrderButton.tsx";

const CustomerById = () => {
    const { id } = useParams<{ id: string }>();
    const customerId = parseInt(id as string, 10);
    const { orders, error: ordersError } = useFetchOrdersByCustomerId(customerId);
    const [customer, setCustomer] = useState<CustomerDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [logo] = useState<string>('/assets/Registration.png');
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

    if (error) {
        return <p className="text-red-500 mt-4">{error}</p>;
    }

    if (!customer) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto mt-8 mb-8">
            <div className="flex flex-col md:flex-row border rounded-lg shadow-lg overflow-hidden">
                {/* Left profile section */}
                <div className="md:w-1/5 bg-lightPink p-8 flex flex-col items-center">
                    <img
                        src={getRandomProfilePicture()}
                        alt="Customer Profile"
                        className="rounded-full w-32 h-32 mb-4"
                    />
                    <h2 className="text-2xl font-bold">{customer.name}</h2>
                    <p className="text-gray-600">Customer</p>
                    <div className="m-16 flex items-center self-start ml-4">
                        <img className="m-4 self-start"
                             src={logo}
                             alt="Logo"
                        />
                        <p className="text-blue-500 mt-2 ml-2">Edit info</p>
                    </div>
                </div>

                {/* Right order details section */}
                <div className="md:w-4/5 bg-gray-100 p-8">
                    <h2 className="text-2xl font-bold">Customer Details</h2>
                    <div className="mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-bold">Email:</p>
                                <p className="text-gray-600">{customer.email}</p>
                            </div>
                            <div>
                                <p className="font-bold">Phone Number:</p>
                                <p className="text-gray-600">{customer.phone}</p>
                            </div>
                            <div>
                                <p className="font-bold">Address:</p>
                                <p className="text-gray-600">{customer.address}</p>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mt-4">Order History</h2>
                        <div className="mt-4 max-h-96 overflow-y-auto">
                            {ordersError && <p className="text-red-500 mt-4">{ordersError}</p>}
                            <ul className="space-y-8">
                                {orders
                                    .filter(order => order.status !== 'cancelled')
                                    .map((order) => (
                                        <li key={order.id} className="p-4 bg-white rounded-lg shadow-sm">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                                                <CancelOrderButton orderId={order.id!} status={order.status ?? ''}/>
                                            </div>
                                            <p className="text-md">Order Date: {order.orderDate}</p>
                                            <p className="text-md">Delivery Date: {order.deliveryDate}</p>
                                            <p className="text-md">Total: €{order.totalAmount}</p>
                                            <p className="text-md">Status: {order.status}</p>
                                            <OrderEntriesTable orderId={order.id!}/>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerById;