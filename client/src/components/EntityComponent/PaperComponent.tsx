import { useAtom } from "jotai";
import { PapersAtom } from "../../Atoms/PapersAtom";
import { useInitializeData } from "../../Hooks/useInitializeData";
import { useEffect } from "react";

export default function PaperComponent() {
    const [papers] = useAtom(PapersAtom);

    useEffect(() => {
        useInitializeData();
    }, []);

    useEffect(() => {
        console.log("Papers state updated:", papers);
    }, [papers]);

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Paper List</h1>
            {papers && papers.length > 0 ? (
                <ul>
                    {papers.map((paper) => (
                        <li key={paper.id} className="paper-item">
                            <h2>{paper.name}</h2>
                            <p>Price: ${paper.price}</p>
                            <p>Stock: {paper.stock}</p>
                            <p>Discontinued: {paper.discontinued ? "Yes" : "No"}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No papers available</p>
            )}
        </div>
    );
}
