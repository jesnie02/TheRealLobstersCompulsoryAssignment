import { useFetchAllPapers } from "../../Hooks/useFetchAllPapers.ts";
import AddToCartButton from "../Utilities/AddToCartButton.tsx";

export default function GetAllPaperComponent() {
    const {papers, loading, error} = useFetchAllPapers();
    console.log(papers);

    // Filter out discontinued papers
    const filteredPapers = papers?.filter(paper => !paper.discontinued) || [];

    return (
        <div>
            <h1 className="menu-title text-6xl m-5 text-white bg-black bg-opacity-50 p-10 rounded-lg shadow-lg">Product
                Catalogue</h1>
            <div className="card-body">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : filteredPapers.length > 0 ? (
                    <ul className="flex justify-items-start mr-8 ml-8">
                        {filteredPapers.map((paper) => (
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