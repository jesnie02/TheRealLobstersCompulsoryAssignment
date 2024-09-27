import { atom } from "jotai";
import { PaperDto } from "../Api";

export const PapersAtom = atom<PaperDto[]>([]);