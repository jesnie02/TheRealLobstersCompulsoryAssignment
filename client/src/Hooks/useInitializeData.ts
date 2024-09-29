import { useAtom } from "jotai";
import { useEffect } from "react";
import { http } from "../http";
import {PapersAtom} from "../Atoms/PapersAtom.tsx";

export function useInitializeData() {
    const [, setPapers] = useAtom(PapersAtom);

    useEffect(() => {
        http.api.paperGetAllPapers().then((response) => {
            setPapers(response.data);
        }).catch(e => {
            console.log(e);
        });
    }, []);
}