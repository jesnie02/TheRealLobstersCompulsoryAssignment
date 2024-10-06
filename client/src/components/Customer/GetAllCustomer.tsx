import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { CustomersAtom } from '../../Atoms/CustomersAtom.tsx';
import { useEffect, useState } from 'react';
import { http } from '../../http.ts';

const GetAllCustomer = () => {
    const [images, setImages] = useState<string[]>([]);
    const [customers, setCustomers] = useAtom(CustomersAtom);
    const navigate = useNavigate();

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

    useEffect(() => {
        http.api.customerGetCustomers().then((response) => {
            const customersWithStringId = response.data.map((customer: any) => ({
                ...customer,
                id: customer.id.toString(),
            }));
            setCustomers(customersWithStringId);
        }).catch(e => {
            console.log(e);
        });
    }, [setCustomers]);

    const handleViewCustomer = (customerId: number | undefined) => {
        navigate(`/customer/${customerId}`);
    };


    return (
        <div className="overflow-x-auto m-14 border border-gray-300">
            <table className="table border">
                <thead>
                <tr>
                    <th className="border">Name</th>
                    <th className="border">Address</th>
                    <th className="border">Email</th>
                    <th className="border">Phone</th>
                    <th className="border">Customer details</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer, index) => (
                    <tr key={index}>
                        <td className="border">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img src={getRandomProfilePicture()} alt={customer.name}
                                             onError={handleImageError}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{customer.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="border">{customer.address}</td>
                        <td className="border">{customer.email}</td>
                        <td className="border">{customer.phone}</td>
                        <th className="border">
                            <button className="btn btn-outline btn-xs"
                                    onClick={() => handleViewCustomer(customer.id)}>details
                            </button>
                        </th>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th className="border">Name</th>
                    <th className="border">Address</th>
                    <th className="border">Email</th>
                    <th className="border">Phone</th>
                    <th className="border">Customer details</th>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default GetAllCustomer;