import {atom} from 'jotai';
import {Trait} from "../Models/modelIndex.ts";


export const traitsAtom = atom<Trait[]>([]);