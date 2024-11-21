import {useAtom} from 'jotai';
import {useCallback, useEffect, useState} from 'react';
import {PapersAtom} from '../Atoms/atomIndex.ts';
import {useHttp} from "./hookIndex.ts";

const useFetchAllPapers = () => {
    const [papers, setPapers] = useAtom(PapersAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPapers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await useHttp().api.paperGetAllPapers();
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
        fetchPapers(); // Always fetch the latest data from the API
    }, [fetchPapers]);

    return {papers, loading, error, fetchPapers};
};

export default useFetchAllPapers;