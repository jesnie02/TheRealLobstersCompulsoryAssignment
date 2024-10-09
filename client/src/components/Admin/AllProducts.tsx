import { useAtom } from "jotai";
import { PapersAtom } from "../../Atoms/PapersAtom.tsx";
import { http } from "../../http.ts";
import { useEffect, useState } from "react";
import CreatePaperProduct from "./CreatePaperProduct.tsx";
import UpdatePaperProduct from "./UpdatePaperProduct.tsx";
import { PaperDto } from "../../Api.ts";
import { AxiosError } from "axios";
import {selectedContentAtom} from "../../Atoms/nemuAtom.ts";

interface Paper {
    id: number;
    name: string;
    discontinued: boolean;
    stock: number;
    price: number;
    traitIds: number[];
}

interface Trait {
    id: number;
    traitName: string;
}

interface Paper extends PaperDto {
    traits: any[];
}

const AllProducts = () => {
    const [Paper, setPaper] = useAtom(PapersAtom);
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    // @ts-ignore
    const [selectedContent, setSelectedContent] = useAtom(selectedContentAtom);

    const fetchPapers = async () => {
        try {
            const response = await http.api.paperGetAllPapers();
            if (Array.isArray(response.data)) {
                const papersWithTraits = await Promise.all(response.data.map(async (paperDto: PaperDto) => {
                    if (paperDto.id !== undefined) {
                        try {
                            const traitsResponse = await http.api.traitGetTraitsByPaperId(paperDto.id);
                            return {
                                ...paperDto,
                                traits: Array.isArray(traitsResponse.data) ? traitsResponse.data as Trait[] : [],
                            };
                        } catch (error) {
                            if ((error as AxiosError).response && (error as AxiosError).response!.status === 404) {
                                return {
                                    ...paperDto,
                                    traits: [],
                                };
                            } else {
                                throw error;
                            }
                        }
                    } else {
                        throw new Error('Paper ID is undefined');
                    }
                }));
                setPaper(papersWithTraits);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    };

    useEffect(() => {
        fetchPapers();
    }, []);

    const closeModal = () => {
        setSelectedPaper(null);
        (document.getElementById('update_modal') as HTMLDialogElement).close();
    };

    const createCloseModal = () => {
        fetchPapers();
        (document.getElementById('my_modal_5') as HTMLDialogElement).close();
    };

    const openUpdateModal = (paper: Paper) => {
        setSelectedPaper({
            ...paper,
            traitIds: paper.traits.map((trait: Trait) => trait.id),
        });
        (document.getElementById('update_modal') as HTMLDialogElement).showModal();
    };


    const filteredPapers = (Paper as Paper[]).filter((paper: Paper) =>
        paper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.traits.map((trait: Trait) => trait.traitName).join(', ').toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.price.toString().includes(searchTerm) ||
        paper.stock.toString().includes(searchTerm)  ||
        paper.discontinued.toString().includes(searchTerm)
    );


    return (
        <div className="overflow-x-auto m-16">
            <div className="flex justify-end space-x-2 m-1 ml-4">
                <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline btn-sm "
                    onClick={() => setSelectedContent('Content 4')}> Traits Overview
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline btn-sm "
                    onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement).showModal()}>Create
                    paper
                </button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <CreatePaperProduct closeModal={createCloseModal}/>
                        <div className="modal-action">
                            <form method="dialog">

                            </form>
                        </div>
                    </div>
                </dialog>
                <input
                    type="text"
                    className="input input-bordered h-8 mb-2"
                    placeholder="Search for paper"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="table border">
                <thead>
                <tr>
                    <th className="border">Name</th>
                    <th className="border">Discontinued</th>
                    <th className="border">Stock</th>
                    <th className="border">Price</th>
                    <th className="border">Traits</th>
                    <th className="border">Update</th>
                </tr>
                </thead>
                <tbody>
                {filteredPapers.map((paper: any) => (
                    <tr key={paper.id}>
                        <td className="border">{paper.name}</td>
                        <td className="border">{paper.discontinued ? 'true' : 'false'}</td>
                        <td className="border">{paper.stock}</td>
                        <td className="border">{paper.price}</td>
                        <td className="border">{paper.traits.length > 0 ? paper.traits.map((trait: Trait) => trait.traitName).join(', ') : 'no trait'}</td>
                        <td className="border">
                            <button className="btn btn-ghost bg-blue-400 btn-xs"
                                    onClick={() => openUpdateModal(paper)}>Update
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th className="border">Name</th>
                    <th className="border">Discontinued</th>
                    <th className="border">Stock</th>
                    <th className="border">Price</th>
                    <th className="border">Traits</th>
                    <th className="border">Update</th>
                </tr>
                </tfoot>
            </table>
            <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {selectedPaper && (
                        <UpdatePaperProduct
                            closeModal={closeModal}
                            paperId={selectedPaper.id}
                            initialData={{
                                name: selectedPaper.name,
                                discontinued: selectedPaper.discontinued,
                                stock: selectedPaper.stock,
                                price: selectedPaper.price,
                                traitIds: selectedPaper.traitIds,
                            }}
                            onSuccess={fetchPapers}
                        />
                    )}
                    <div className="modal-action">
                        <form method="dialog"></form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AllProducts;