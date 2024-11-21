import {atom} from "jotai";
import {PaperDto} from "../Models/modelIndex.ts";

export const PapersAtom = atom<PaperDto[]>([]);