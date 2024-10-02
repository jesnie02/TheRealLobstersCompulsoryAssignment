import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { CustomersAtom } from '../../Atoms/CustomersAtom.tsx';
import { useEffect, useState } from 'react';
import { http } from '../../http.ts';



const GetAllCustomer = () => {
    const [images, setImages] = useState<string[]>([]);
    const [customers, setCustomers] = useAtom(CustomersAtom);
    const navigate = useNavigate();

    const imagesContext = import.meta.glob('../../assets/ProfilePictures/*.png');

    useEffect(() => {
        const loadImages = async () => {
            try {
                const imagePaths = Object.keys(imagesContext);
                if (imagePaths.length === 0) {
                    //console.error("No images found in the specified folder.");
                    return;
                }
                const imageUrls = await Promise.all(imagePaths.map(path => imagesContext[path]().then(() => new URL(path, import.meta.url).href)));
                //console.log("Loaded image URLs:", imageUrls);
                setImages(imageUrls);
            } catch (error) {
                console.error("Error loading images:", error);
            }
        };
        loadImages();
    }, []);

    const getRandomProfilePicture = () => {
        return images.length > 0 ? images[Math.floor(Math.random() * images.length)] : '';
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
        <>


            <div className="flex flex-wrap justify-center mt-12">
                <h1 className="w-full text-center font-bold text-3xl mb-12">Customers</h1>
                <div>
                    <ul className="flex flex-wrap justify-center">
                        {customers.map((customer, index) => (
                            <li key={index}
                                className="card p-4 border m-1.5 border-gray-200 rounded-lg shadow-md flex flex-col items-center bg-blue-200">
                                <img src={getRandomProfilePicture()} className="w-24 h-24 rounded-full mb-2 " />
                                <h2 className="mt-2 font-bold">Name: {customer.name}</h2>
                                <p className="font-bold">Address: {customer.address}</p>
                                <p className="font-bold">Email: {customer.email}</p>
                                <p className="font-bold">Phone number: {customer.phone}</p>
                                <button className="btn btn-outline mt-2"
                                        onClick={() => handleViewCustomer(customer.id)}>View customer
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default GetAllCustomer;