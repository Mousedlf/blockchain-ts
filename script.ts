import {Wallet} from "./Wallet";
import {Blockchain} from "./Blockchain";
import {createHash} from "node:crypto";
import * as fs from "node:fs";
import * as path from 'path';

const blockchain = new Blockchain();

const robert = new Wallet();
robert.generateKeys();
const thomas = new Wallet();
thomas.generateKeys();
const gilbert = new Wallet();
gilbert.generateKeys();

blockchain.genesis(100, blockchain, robert);

robert.sendMoney(thomas, 40, blockchain);
gilbert.sendMoney(thomas, 10, blockchain);
thomas.sendMoney(gilbert, 10, blockchain);

console.log(blockchain);

fs.writeFileSync("blockchain.json", JSON.stringify(blockchain, null, 2))


