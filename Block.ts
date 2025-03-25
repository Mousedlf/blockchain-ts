import {Transaction} from "./Transaction";

export class Block {
    nonce: number;
    transaction: Transaction;
    previousHash: string;
    transactionHash: string;
}