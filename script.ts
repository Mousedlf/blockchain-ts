import {Wallet} from "./Wallet";
import {Blockchain} from "./Blockchain";
import * as fs from "node:fs";

//
const blockchain = new Blockchain();

const robert = new Wallet();
robert.generateKeys();

const thomas = new Wallet();
thomas.generateKeys();

const gilbert = new Wallet();
gilbert.generateKeys();

//

blockchain.genesis(100, blockchain, robert);

robert.sendMoney(thomas, 40, blockchain);
gilbert.sendMoney(thomas, 10, blockchain); // pas possible
thomas.sendMoney(gilbert, 10, blockchain);

const soldeThomas = thomas.getBalance(thomas.publicKey, blockchain);

console.log("solde thomas : " , soldeThomas);

fs.writeFileSync("blockchain.json", JSON.stringify(blockchain, null, 2))
