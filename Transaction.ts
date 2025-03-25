import {Wallet} from "./Wallet";

export class Transaction {
    amount: number;
    sender: string;
    receiver: string;
    signed: boolean;
}