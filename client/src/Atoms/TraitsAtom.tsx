import { atom } from "jotai";
import { TraitDto } from "../Api";

export const TraitsAtom = atom<TraitDto[]>([]);