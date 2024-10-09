import {useAtom} from 'jotai';
import {Api} from "../../Api.ts";
import {FaPencilAlt } from 'react-icons/fa';
import CreateTraits from "./CreateTraits.tsx";
import {allTraitsAtom} from "../../Atoms/AllTraitsAtom.tsx";

const GetAllTraits = () => {
    const [allTraits, setAllTraits] = useAtom(allTraitsAtom);

    const api = new Api();



    const handleUpdateAllTrait = async (index: number) => {
        const updatedTraitName = prompt("Update trait:", allTraits[index].traitName!);
        if (updatedTraitName !== null && updatedTraitName.trim()) {
            const updatedTrait = { traitName: updatedTraitName, id: allTraits[index].id };
            try {
                console.log('Updating trait with ID:', allTraits[index].id);
                await api.api.traitUpdateTrait(allTraits[index]!.id!, updatedTrait);
                const updatedAllTraits = [...allTraits];
                updatedAllTraits[index].traitName = updatedTraitName;
                setAllTraits(updatedAllTraits);
            } catch (error) {
                console.error('Error updating trait:', error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="border border-gray-300 rounded p-4 mt-12 mb-14" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <table className="table" style={{ minWidth: '800px' }}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Trait</th>
                        <th>Actions</th>
                        <th className="flex justify-end pl-2">
                            <button
                                className="btn btn-success btn-sm mt-1"
                                style={{ marginBottom: '4px' }}
                                onClick={() => {
                                    const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
                                    if (modal) {
                                        modal.showModal();
                                    }
                                }}
                            >
                                Add Trait
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {allTraits.map((trait, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td className="pr-20">{trait.traitName}</td>
                            <td className="space-x-4">
                                <button onClick={() => handleUpdateAllTrait(index)} className="mr-2">
                                    <FaPencilAlt />
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Trait</th>
                        <th>Actions</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col items-center">
                    <CreateTraits />
                    <div className="modal-action flex justify-end">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default GetAllTraits;