import { useFetchAllPapers } from "../../Hooks/useFetchAllPapers.ts";
import AddToCartButton from "../Utilities/AddToCartButton.tsx";
import { useState } from "react";
import { priceRangeAtom } from "../../Atoms/pricerange.ts";
import { useAtom } from "jotai";
import { selectedTraitsAtom } from "../../Atoms/selectedTraits.ts";
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel} from "@mui/material";


export default function GetAllPaperComponent() {
    const { papers, loading, error } = useFetchAllPapers();
    const [sortOrder, setSortOrder] = useState("name");
    const [selectedTraits, setSelectedTraits] = useAtom(selectedTraitsAtom);
    const [priceRange, setPriceRange] = useAtom(priceRangeAtom);
    const [searchTerm, setSearchTerm] = useState("");


    console.log(papers);

    const filteredPapers = papers?.filter(paper =>
        !paper.discontinued &&
        (selectedTraits.length === 0 || selectedTraits.every(trait => paper.traits?.some(t => t.traitName === trait))) &&
        (paper.price ?? 0) >= priceRange[0] &&
        (paper.price ?? 0) <= priceRange[1] &&
        (paper.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.traits?.some(t => t.traitName?.toLowerCase().includes(searchTerm.toLowerCase() ?? "")))
    ) || [];

    const sortedPapers = filteredPapers.slice().sort((a, b) => {
        if (sortOrder === "name") {
            return (a.name ?? "").localeCompare(b.name ?? "");
        } else if (sortOrder === "price(low)") {
            return (a.price ?? 0) - (b.price ?? 0);
        } else if (sortOrder === "price(high)") {
            return (b.price ?? 0) - (a.price ?? 0);
        } else if (sortOrder === "stock") {
            return (a.stock ?? 0) - (b.stock ?? 0);
        }
        return 0;
    });

    const handleTraitChange = (trait: string) => {
        setSelectedTraits(prev =>
            prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]
        );
    };


    const allTraits = Array.from(new Set(filteredPapers.flatMap(paper => paper.traits?.map(t => t.traitName) ?? []) ?? []));


    const maxPrice = Math.max(0, ...papers.map(paper => paper.price ?? 0));
    const minPrice = Math.min(0, ...papers.map(paper => paper.price ?? 0));

    return (
        <div>
            <h1 className="menu-title text-6xl m-5 text-black bg-lightPink bg-opacity-50 p-10 rounded-lg shadow-lg">Product Catalogue</h1>
            <div className="card-body">
                <div className="flex justify-end mb-4 mr-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered input-md w-full max-w-xs mr-4"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                <div className=" items-center mb-4 ml-6">
                    <p className="mr-2">Price Range:</p>
                    <Slider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                        valueLabelDisplay="auto"
                        min={minPrice}
                        max={maxPrice}
                        className="ml-2 w-full max-w-xs"
                    />
                </div>
                <div className="flex flex-wrap mb-4 ml-4 mr-4">
                    {allTraits.map(trait => (
                        <FormControlLabel
                            key={trait ?? 'unknown'}
                            control={
                                <Checkbox
                                    checked={selectedTraits.includes(trait ?? '')}
                                    onChange={() => handleTraitChange(trait ?? '')}
                                    color="primary"
                                />
                            }
                            label={trait ?? 'Unknown'}
                        />
                    ))}
                </div>
                {loading ? (
                    <span className="loading loading-dots loading-lg"></span>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : sortedPapers.length > 0 ? (
                    <ul className="flex flex-wrap justify-center mr-8 ml-8">
                        {sortedPapers.map((paper) => (
                            <li key={paper.id || paper.name}
                                className="card  min-w-[350px] p-4 border m-1.5 items-center border-gray-200 rounded-lg shadow-md">
                                <figure>
                                    <img
                                        src="/assets/PaperImages/A4CopyPaper.jpg"
                                        alt={paper.name ?? ""}
                                        className="w-full h-48 object-cover"/>
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{paper.name}</h2>
                                    <p className="label">Price: ${paper.price}</p>
                                    <p className="label">Stock: {paper.stock}</p>
                                    <div className="badges grid grid-cols-2 ">
                                        {paper.traits?.map((trait) => (
                                            <span key={trait.traitName ?? 'unknown'}
                                                  className="badge badge-primary m-1">
                                                    {trait.traitName ?? 'Unknown'}
                                            </span>
                                        ))}
                                    </div>
                                    <AddToCartButton paper={paper}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No papers available</p>
                )}
            </div>
        </div>
    );
}