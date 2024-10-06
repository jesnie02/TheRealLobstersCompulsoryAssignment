import { useFetchAllPapers } from "../../Hooks/useFetchAllPapers.ts";
import AddToCartButton from "../Utilities/AddToCartButton.tsx";
import {useState} from "react";

export default function GetAllPaperComponent() {
    const {papers, loading, error} = useFetchAllPapers();
    const [sortOrder, setSortOrder] = useState("name");
    console.log(papers);

    // Filter out discontinued papers
    const filteredPapers = papers?.filter(paper => !paper.discontinued) || [];

    const sortedPapers = filteredPapers.slice().sort((a, b) => {
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
        <div>
            <h1 className="menu-title text-6xl m-5 text-black bg-lightPink bg-opacity-50 p-10 rounded-lg shadow-lg">Product
                Catalogue</h1>
            <div className="card-body">
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
                ) : sortedPapers.length > 0 ? (
                    <ul className="flex justify-items-start mr-8 ml-8">
                        {sortedPapers.map((paper) => (
                            <li key={paper.id || paper.name}
                                className="card p-4 border m-1.5 items-center border-gray-200 rounded-lg shadow-md">
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
                                    <p className="label">Discontinued: {paper.discontinued ? "Yes" : "No"}</p>
                                    <div className="badges">
                                        {paper.traits?.map((trait) => (
                                            <span key={trait.traitName} className="badge badge-primary m-1">
                                            {trait.traitName}
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