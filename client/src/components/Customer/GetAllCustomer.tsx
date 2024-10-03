import { useNavigate } from 'react-router-dom';
import { useFetchAllCustomers} from "../../Hooks/useFetchAllCustomers.ts";
import {useEffect, useState} from "react";

const GetAllCustomer = () => {
    const { customers, } = useFetchAllCustomers();
    const navigate = useNavigate();
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

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = '/assets/ProfilePictures/ProfileLogo.png';
    };

    const handleViewCustomer = (customerId: number | undefined) => {
        navigate(`/customer/${customerId}`);
    };

    return (
        <div className="overflow-x-auto m-14 border border-gray-300">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer, index) => (
                    <tr key={index}>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img src={getRandomProfilePicture()} alt={customer.name} onError={handleImageError} />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{customer.name}</div>
                                </div>
                            </div>
                        </td>
                        <td>{customer.address}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <th>
                            <button className="btn btn-outline btn-xs" onClick={() => handleViewCustomer(customer.id)}>details</button>
                        </th>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default GetAllCustomer;