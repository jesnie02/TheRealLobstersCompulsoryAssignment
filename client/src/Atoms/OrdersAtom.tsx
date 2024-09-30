import { atom } from "jotai";
import { OrderDto } from "../Api";

export const OrdersAtom = atom<OrderDto[]>([]);