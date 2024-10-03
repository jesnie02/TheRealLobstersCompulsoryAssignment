import { useAtom } from "jotai";
import { CartAtom } from "../../../Atoms/CartAtom.tsx";
import { useFetchAllPapers } from "../../../Hooks/useFetchAllPapers.ts";

export default function GetAllPaperComponent() {
    const { papers, loading, error } = useFetchAllPapers();
    const [, setCart] = useAtom(CartAtom);

    const addToCart = (paper: any) => {
        setCart((prevCart) => [...prevCart, paper]);
        alert(`${paper.name} added to cart!`);
    };

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Paper List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : papers && papers.length > 0 ? (
                <ul className="flex justify-items-start mr-8 ml-8">
                    {papers.map((paper) => (
                        <li key={paper.id || paper.name}
                            className="card p-4 border m-1.5 items-center border-gray-200 rounded-lg shadow-md">
                            <h2>{paper.name}</h2>
                            <p>Traits: {paper.traits?.map((trait) => trait.traitName).join(", ")}</p>
                            <p>Price: ${paper.price}</p>
                            <p>Stock: {paper.stock}</p>
                            <p>Discontinued: {paper.discontinued ? "Yes" : "No"}</p>
                            <button className="btn btn-outline mt-1" onClick={() => addToCart(paper)}>
                                Add to cart
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No papers available</p>
            )}
        </div>
    );
}