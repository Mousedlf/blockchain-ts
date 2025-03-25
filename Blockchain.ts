import {Block} from "./Block";
import {Transaction} from "./Transaction";
import {Wallet} from "./Wallet";
import {createHash} from "node:crypto";

export class Blockchain {
    blocks: Block[];

    constructor() {
        this.blocks = [];
    }

    public genesis(amount: number, blockchain: Blockchain, receiver: Wallet) {
        const transaction = new Transaction();
        transaction.sender = "Genese";
        transaction.amount = amount;
        transaction.receiver = receiver.publicKey;
        transaction.signed = true;

        const block = new Block();
        block.transaction = transaction;
        block.previousHash = "";
        block.nonce = Math.floor(Math.random() * 99999);
        block.transactionHash = createHash('MD5').update(block.nonce.toString()).digest('hex');

        this.blocks.push(block);
    }

    public addBlock(blockchain: Blockchain, transaction: Transaction) {
        const block = new Block();
        block.transaction = transaction;
        block.nonce = Math.floor(Math.random() * 99999);
        block.previousHash = this.getPreviousHash().toString();
        block.transactionHash = createHash('MD5').update(block.nonce.toString()).digest('hex');

        this.blocks.push(block);
    }

    public getPreviousHash(){
        return this.blocks[this.blocks.length - 1].transactionHash;
    }

}