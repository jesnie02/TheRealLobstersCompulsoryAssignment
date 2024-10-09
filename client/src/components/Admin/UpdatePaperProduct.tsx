import { useState, useEffect } from "react";
import { http } from "../../http.ts";
import axios from "axios";
import toast from "react-hot-toast";

interface UpdatePaperProductProps {
    closeModal: () => void;
    paperId: number;
    initialData: {
        name: string;
        discontinued: boolean;
        stock: number;
        price: number;
        traitIds: number[];
    };
    onSuccess: () => Promise<void>;
}

const UpdatePaperProduct = ({ closeModal, paperId, initialData, onSuccess }: UpdatePaperProductProps) => {
    const [formData, setFormData] = useState({
        ...initialData,
        traitIds: initialData.traitIds || [],
    });
    const [selectedTrait, setSelectedTrait] = useState<{ id: number; traitName: string } | null>(null);
    const [traits, setTraits] = useState<{ id: number; traitName: string }[]>([]);

    useEffect(() => {
        const fetchTraits = async () => {
            try {
                const response = await http.api.traitGetAllTraits();
                if (Array.isArray(response.data)) {
                    setTraits(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching traits:', error);
            }
        };

        fetchTraits();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: name === "discontinued" ? value === "true" : (type === "checkbox" ? checked : value),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...formData, id: paperId, traitIds: formData.traitIds };
        console.log("Submitting data:", { paperId, payload });
        try {
            const response = await http.api.paperUpdateExistingPaper(paperId, payload);
            console.log("Response:", response);
            toast.success('Paper updated successfully');
            await onSuccess();
            closeModal();
        } catch (error) {
            console.error("Error updating paper:", error);
            toast.error('Failed to update paper');
            if (axios.isAxiosError(error)) {
                console.error("Response data:", error.response?.data);
                console.error("Response status:", error.response?.status);
                console.error("Response headers:", error.response?.headers);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handleAddTrait = () => {
        if (selectedTrait && !formData.traitIds.includes(selectedTrait.id)) {
            setFormData({
                ...formData,
                traitIds: [...formData.traitIds, selectedTrait.id],
            });
        }
    };

    const handleSelectTrait = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTrait = traits.find(trait => trait.traitName === e.target.value);
        setSelectedTrait(selectedTrait || null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update Paper Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min={0}
                            max={10000}
                            className="shadow appearance-none border rounded w-full py-2 px-3 max-w-40 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min={0.0}
                            max={1000.0}
                            className="shadow appearance-none border rounded w-full py-2 px-3 max-w-40 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
                <div className="flex space-x-4 items-center">
                    <div className="flex flex-col">
                        <label className="form-control max-w-64">
                            <div className="label">
                                <span className="label-text font-bold">Discontinued</span>
                            </div>
                            <select
                                className="select select-bordered"
                                name="discontinued"
                                value={formData.discontinued ? 'true' : 'false'}
                                onChange={handleChange}
                            >
                                <option disabled value="">Pick one</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex flex-col">
                        <label className="form-control max-w-80">
                            <div className="label">
                                <span className="label-text font-bold">Traits</span>
                            </div>
                            <div className="flex items-center">
                                <select onChange={handleSelectTrait} id="traits" className="select select-bordered" value={selectedTrait?.traitName || "Pick one"}>
                                    <option disabled value="Pick one">Pick one</option>
                                    {traits.map((trait) => (
                                        <option key={trait.id} value={trait.traitName}>{trait.traitName}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={handleAddTrait}
                                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                        {formData.traitIds.map((traitId) => (
                            <li key={traitId} className="flex items-center">
                                {traits.find(trait => trait.id === traitId)?.traitName || `ID: ${traitId}`}
                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        ...formData,
                                        traitIds: formData.traitIds.filter(id => id !== traitId)
                                    })}
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
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                    >
                        Update Product
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePaperProduct;