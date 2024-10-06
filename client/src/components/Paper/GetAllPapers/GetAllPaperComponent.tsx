import { useState } from "react";
import { useAtom } from "jotai";
import { CartAtom } from "../../../Atoms/CartAtom.tsx";
import { useGetAllPaperData } from "./useGetAllPaperDataHook.ts";

export default function GetAllPaperComponent() {
    const { papers, loading, error } = useGetAllPaperData();
    const [, setCart] = useAtom(CartAtom);
    const [sortOrder, setSortOrder] = useState("name");

    const addToCart = (paper: any) => {
        setCart((prevCart) => [...prevCart, paper]);
        alert(`${paper.name} added to cart!`);
    };

    const sortedPapers = papers?.slice().sort((a, b) => {
        if (sortOrder === "name") {
            return (a.name ?? "").localeCompare(b.name ?? "");
        } else if (sortOrder === "price(low)") {
            return (a.price ?? 0) - (b.price ?? 0);
        } else if (sortOrder === "price(high)") {
            return (b.price ?? 0) - (a.price ?? 0);
        }
        else if (sortOrder === "stock") {
            return (a.stock ?? 0) - (b.stock ?? 0);
        }
        return 0;
    });

    return (
        <div className="mt-12">
            <div className="flex justify-end mb-4 mr-4">
                <select
                    className="select select-bordered"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="name">Sort by Name</option>
                    <option value="price(low)">Sort by Price(low)</option>
                    <option value="price(high)">Sort by Price(high)</option>
                    <option value="stock">Sort by Stock</option>
                </select>
            </div>

            {loading ? (
                <span className="loading loading-dots loading-lg"></span>
            ) : error ? (
                <p>Error: {error}</p>
            ) : sortedPapers && sortedPapers.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-8 ml-8">
                    {sortedPapers.filter(paper => paper.discontinued).map((paper) => (
                        <li key={paper.id || paper.name}
                            className="card p-4 border m-1.5 border-gray-200 rounded-lg shadow-md ">
                            <div className="text-2xl items-center font-bold flex flex-col">
                                <h2>{paper.name}</h2>
                            </div>
                            <div className="divider"></div>

                            <div className="flex justify-end font-semibold text-2xl mb-1 mr-4">
                                <p className="border p-4">Price: $ {paper.price}</p>
                            </div>
                            <div className="flex justify-start mt-4 mb-1">
                                {paper.traits?.map((trait) => (
                                    <span key={trait.traitName}
                                          className="bg-gray-200 text-gray-800 text-xs font-semibold h-6 mr-2 px-2.5 py-0.5 rounded">
                    {trait.traitName}
            </span>
                                ))}
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <div className="flex justify-end items-center ">
                                    <div className="mr-4 pt-1 font-semibold">
                                        <p>Stock: {paper.stock}</p>
                                    </div>
                                    <input
                                        type="number"
                                        defaultValue="1"
                                        min="1"
                                        className="input input-bordered w-14 mr-4 font-semibold  border-gray-300"
                                    />
                                    <button className="btn btn-outline font-semibold bg-green-500 "
                                            onClick={() => addToCart(paper)}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No papers available</p>
            )}
        </div>
    );
}