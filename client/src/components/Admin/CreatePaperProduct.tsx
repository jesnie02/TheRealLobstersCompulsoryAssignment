import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { traitsAtom } from '../../Atoms/traitsAtom';
import { http } from '../../http.ts';
import { Trait } from "../../Api.ts";
import toast, { Toaster } from "react-hot-toast";

interface CreatePaperProductProps {
    closeModal: () => void;
}

const CreatePaperProduct: React.FC<CreatePaperProductProps> = ({ closeModal: createCloseModal }) => {
    const [productName, setProductName] = useState('');
    const [discontinued, setDiscontinued] = useState(false);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0.0);
    const [traits, setAllTraits] = useAtom<Trait[]>(traitsAtom);
    const [searchTerm] = useState('');
    const [addedTraits, setAddedTraits] = useState<Trait[]>([]);
    const [selectedTrait, setSelectedTrait] = useState<Trait | null>(null);

    const fetchTraits = async () => {
        try {
            const response = await http.api.traitGetAllTraits();
            if (Array.isArray(response.data)) {
                setAllTraits(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching traits:', error);
        }
    };

    useEffect(() => {
        fetchTraits();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(addedTraits);
        try {
            const response = await http.api.paperCreateNewPaper({
                name: productName,
                discontinued,
                stock,
                price,
                traitIds: addedTraits.map(trait => trait.id).filter((id): id is number => id !== undefined),
            });
            if (response.status === 201) {
                toast.success('Paper created successfully');
                setProductName('');
                setDiscontinued(true);
                setStock(0);
                setPrice(0.0);
                setAddedTraits([]);
            } else {
                toast.error('Failed to create paper');
            }
        } catch (error) {
            console.error('Error creating paper:', error);
            toast.error('Failed to create paper');
        }
    };

    const handleAddTrait = () => {
        if (selectedTrait && !addedTraits.includes(selectedTrait)) {
            setAddedTraits([...addedTraits, selectedTrait]);
        }
    };

    const handleSelectTrait = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTrait = traits.find(trait => trait.traitName === e.target.value);
        setSelectedTrait(selectedTrait || null);
    };

    const filteredTraits = (traits ?? []).filter(trait =>
        trait.traitName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Create Paper Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        maxLength={50}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 max-w-96 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex space-x-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                            Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            min={0}
                            max={10000}
                            className="shadow appearance-none border rounded w-full py-2 px-3 max-w-40 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold  mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            min={0.0}
                            max={1000.0}
                            className="shadow appearance-none border rounded w-full py-2 px-3 max-w-40 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>

                <div className="flex space-x-4 items-center">
                    <div className=" flex flex-col">
                        <label className="form-control max-w-64">
                            <div className="label">
                                <span className="label-text font-bold">Discontinued</span>
                            </div>
                            <select
                                className="select select-bordered"
                                value={discontinued ? 'true' : 'false'}
                                onChange={(e) => setDiscontinued(e.target.value === 'true')}
                            >
                                <option disabled value="">Pick one</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </label>
                    </div>

                    <div className=" flex flex-col ">
                        <label className="form-control max-w-80 ">
                            <div className="label">
                                <span className="label-text font-bold">Traits</span>
                            </div>
                            <div className="flex items-center">
                                <select onChange={handleSelectTrait} id="traits" className="select select-bordered" defaultValue="">
                                    <option disabled value="">Pick one</option>
                                    {filteredTraits.map((trait) => (
                                        <option key={trait.id} value={trait.traitName || ''}>{trait.traitName}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={handleAddTrait}
                                    className=" ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="mt-4 mb-4">
                    <h2 className="text-xl font-bold mb-2">Added traits</h2>
                    <ul className="list-disc pl-5">
                        {addedTraits.map((trait) => (
                            <li key={trait.id} className="flex items-center">
                                {trait.traitName}
                                <button
                                    type="button"
                                    onClick={() => setAddedTraits(addedTraits.filter(t => t.id !== trait.id))}
                                    className="ml-2"
                                >
                                    <img src="/assets/reddelete.png" alt="Remove" className="h-4 w-4 mr-2"/>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex">
                    <button
                        type="submit"
                        className="  bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                    >
                        Create Product
                    </button>

                    <button
                        type="button"
                        onClick={createCloseModal}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePaperProduct;