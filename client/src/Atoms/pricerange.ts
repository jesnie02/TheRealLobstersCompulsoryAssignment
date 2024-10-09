import {atom} from "jotai";


export const priceRangeAtom = atom<[number, number]>([0, Infinity]);