import {atom} from "jotai/index";
import {TraitDto} from "../Api.ts";

export const AllTraitsAtom = atom<TraitDto[]>([]);