import { useFetchAllPapers } from "../../Hooks/useFetchAllPapers.ts";
import AddToCartButton from "../Utilities/AddToCartButton.tsx";

export default function GetAllPaperComponent() {
    const { papers, loading, error } = useFetchAllPapers();
    console.log(papers);

    // Filter out discontinued papers
    const filteredPapers = papers?.filter(paper => !paper.discontinued) || [];

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Paper List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : filteredPapers.length > 0 ? (
                <ul className="flex justify-items-start mr-8 ml-8">
                    {filteredPapers.map((paper) => (
                        <li key={paper.id || paper.name}
                            className="card p-4 border m-1.5 items-center border-gray-200 rounded-lg shadow-md">
                            <h2>{paper.name}</h2>
                            <p>Traits: {paper.traits?.map((trait) => trait.traitName).join(", ")}</p>
                            <p>Price: ${paper.price}</p>
                            <p>Stock: {paper.stock}</p>
                            <p>Discontinued: {paper.discontinued ? "Yes" : "No"}</p>
                            <AddToCartButton paper={paper} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No papers available</p>
            )}
        </div>
    );
}