// Define atoms
import {atom} from "jotai/index";
import {TraitDto} from "../../Api.ts";

export const allTraitsAtom = atom<TraitDto[]>([]);