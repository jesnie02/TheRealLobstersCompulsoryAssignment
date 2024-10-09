import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { Api } from "../../Api.ts";
import {allTraitsAtom} from "../../Atoms/AllTraitsAtom.tsx";
import toast, {Toaster} from "react-hot-toast";


const traitAtom = atom('');
const traitsAtom = atom<string[]>(['', '', '', '', '']);
const selectedTraitAtom = atom<string | null>(null);

const CreateTraits = () => {
    const [trait, setTrait] = useAtom(traitAtom);
    const [traits, setTraits] = useAtom(traitsAtom);
    const [allTraits, setAllTraits] = useAtom(allTraitsAtom);
    const [selectedTrait, setSelectedTrait] = useAtom(selectedTraitAtom);

    const api = new Api();

    const fetchTraits = async () => {
        try {
            const response = await api.api.traitGetAllTraits();
            if (Array.isArray(response.data)) {
                const traitsData = response.data.map((item: any) => ({ id: item.id, traitName: item.traitName }));
                setAllTraits(traitsData);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching traits:', error);
        }
    };

    useEffect(() => {
        fetchTraits();
    }, [setAllTraits]);

    const handleAddTrait = async () => {
        if (trait.trim()) {
            const updatedTraits = [...traits];
            const emptyIndex = updatedTraits.indexOf('');
            if (emptyIndex !== -1) {
                updatedTraits[emptyIndex] = trait;
            } else {
                updatedTraits.push(trait);
            }
            setTraits(updatedTraits);
            setTrait('');

            await fetchTraits();
        }
    };

    const handleDeleteTrait = (traitToDelete: string) => {
        setTraits(traits.map(t => t === traitToDelete ? '' : t));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            for (const trait of traits.filter(t => t.trim())) {
                const response = await api.api.traitCreateTrait({ traitName: trait });
                console.log('Trait submitted:', response.data);
                setAllTraits([...allTraits, { id: response.data.id!, traitName: trait }]);
            }
            setTraits(['', '', '', '', '']);
            await fetchTraits();
            toast.success('Traits created successfully');
        } catch (error) {
            console.error('Error submitting traits:', error);
            toast.error('Failed to create traits');
        }
    };

    return (
        <div className="flex flex-col items-center mt-12">
            <Toaster />
            <h1 className="text-3xl font-bold mb-6">Create Trait</h1>
            <div className="flex items-center w-full max-w-4xl ">
                <div className="rounded p-4 border border-gray-300 h-fit">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex items-center  ">
                            <input
                                type="text"
                                id="trait"
                                value={trait}
                                onChange={(e) => setTrait(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddTrait();
                                    }
                                }}
                                placeholder="Add a new trait"
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
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Trait</th>
                                </tr>
                                </thead>
                                <tbody>
                                {traits.map((t, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-base-200" : ""} ${selectedTrait === t ? "bg-red-200" : ""}`}
                                        onClick={() => setSelectedTrait(t)}
                                    >
                                        <th>{index + 1}</th>
                                        <td>{t}</td>
                                        <td>

                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDeleteTrait(selectedTrait || '')}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete Trait
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default CreateTraits;