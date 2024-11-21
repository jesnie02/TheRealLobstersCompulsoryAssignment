import {atom} from "jotai";
import {Customer} from "../Models/modelIndex.ts";

export const CustomersAtom = atom<Customer[]>([]);