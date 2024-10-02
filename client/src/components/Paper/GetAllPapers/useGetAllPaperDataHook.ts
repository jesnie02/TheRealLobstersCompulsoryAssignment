import { useAtom } from "jotai";
import { useEffect, useCallback, useState } from "react";
import { PapersAtom} from "../../../Atoms/PapersAtom.tsx";
import { Api} from "../../../Api.ts";

export const useGetAllPaperData = () => {
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

    return { papers, loading, error, fetchPapers };
};