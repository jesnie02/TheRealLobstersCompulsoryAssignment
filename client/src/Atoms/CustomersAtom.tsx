import { atom } from "jotai";
import { Customer } from "../Api";

export const CustomersAtom = atom<Customer[]>([]);