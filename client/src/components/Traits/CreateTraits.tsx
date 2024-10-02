import { useState } from 'react';
import { Api } from "../../Api.ts";

const CreateTraits = () => {
    const [trait, setTrait] = useState('');
    const [traits, setTraits] = useState<string[]>([]);

    const api = new Api();

    const handleAddTrait = () => {
        if (trait.trim() && !traits.includes(trait)) {
            setTraits([...traits, trait]);
            setTrait('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            for (const trait of traits) {
                const response = await api.api.traitCreateTrait({ traitName: trait });
                console.log('Trait submitted:', response.data);
            }
            setTraits([]); // Clear the list after submission
        } catch (error) {
            console.error('Error submitting traits:', error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-12">
            <h1 className="text-3xl font-bold mb-6">Create Trait</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold " htmlFor="trait">
                        Add a new trait
                    </label>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <input
                        type="text"
                        id="trait"
                        value={trait}
                        onChange={(e) => setTrait(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                        type="button"
                        onClick={handleAddTrait}
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-nowrap"
                    >
                        Add Trait
                    </button>
                </div>
                <div className="mb-4 border border-gray-300 rounded p-4">
                    <h2 className="text-xl font-bold mb-2">Traits List</h2>
                    <ul className="list-disc list-inside">
                        {traits.map((t, index) => (
                            <li key={index}>{t}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTraits;