import { Mina } from "o1js";
export declare function createPayment(amount: number): Promise<Mina.PendingTransaction>;
export declare function withDraw(): Promise<void>;
