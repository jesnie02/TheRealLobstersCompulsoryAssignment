import {atom} from "jotai/index";
import {TraitDto} from "../Models/modelIndex.ts";

export const AllTraitsAtom = atom<TraitDto[]>([]);