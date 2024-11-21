import {atom} from "jotai";
import {OrderDto} from "../Models/modelIndex.ts";

export const OrdersAtom = atom<OrderDto[]>([]);