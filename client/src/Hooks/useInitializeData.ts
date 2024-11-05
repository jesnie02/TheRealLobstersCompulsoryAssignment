import { useAtom } from "jotai";
import { useEffect } from "react";
import { http } from "../http";
import { AllTraitsAtom, PapersAtom } from "../Atoms/atomIndex.ts";

const useInitializeData = () => {
    const [, setPapers] = useAtom(PapersAtom);
    const [, setAllTraits] = useAtom(AllTraitsAtom);

    useEffect(() => {
        http.api.paperGetAllPapers().then((response) => {
            setPapers(response.data);
        }).catch(e => {
            console.log(e);
        });

        fetchTraits();
    }, []);

    const fetchTraits = async () => {
        try {
            const response = await http.api.traitGetAllTraits();
            if (Array.isArray(response.data)) {
                const traitsData = response.data.map((item: any) => ({ id: item.id, traitName: item.traitName }));
                setAllTraits(traitsData);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching traits:', error);
        }
    };
};

export default useInitializeData;