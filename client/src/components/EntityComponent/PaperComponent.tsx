import { useAtom } from "jotai";
import { PapersAtom } from "../../Atoms/PapersAtom";
import { useEffect, useCallback, useState } from "react";
import { Api } from "../../Api.ts";

export default function PaperComponent() {
    const [papers, setPapers] = useAtom(PapersAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPapers = useCallback(async () => {
        setLoading(true);
        try {
            const api = new Api();
            const response = await api.api.paperGetAllPapers();
            if (response.status !== 200) throw new Error("Failed to fetch papers");

            setPapers(response.data);
            localStorage.setItem("papers", JSON.stringify(response.data));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [setPapers]);

    useEffect(() => {
        const storedPapers = localStorage.getItem("papers");
        if (storedPapers) {
            setPapers(JSON.parse(storedPapers));
        } else {
            fetchPapers();
        }
    }, [fetchPapers, setPapers]);

    useEffect(() => {
        console.log("Papers state updated:", papers);
    }, [papers]);

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Paper List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : papers && papers.length > 0 ? (
                <ul className="paper-list">
                    {papers.map((paper) => (
                        <li key={paper.id || paper.name} className="paper-item">
                            <h2>{paper.name}</h2>
                            <p>Traits: {paper.traits?.map(trait => trait.traitName).join(", ")}</p>
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