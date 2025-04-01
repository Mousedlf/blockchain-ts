import {generateKeyPairSync} from "crypto";
import {Transaction} from "./Transaction";
import {Blockchain} from "./Blockchain";
import {createPrivateKey, sign, verify} from "node:crypto";

export class Wallet {
    publicKey: string;
    privateKey: string;

    public generateKeys() {
        const {publicKey, privateKey,} = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'top secret',
            },
        });

        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    public sendMoney(receiver: Wallet, amount: number, blockchain: Blockchain) {

        const transaction = new Transaction();
        transaction.sender = this.publicKey
        transaction.receiver = receiver.publicKey;
        transaction.amount = amount;

        const balance = this.getBalance(this.publicKey, blockchain);
        const isVerified = this.verifyKeys(this.publicKey, this.privateKey);

        if(balance >= amount && isVerified) {
            transaction.signed = true;
            blockchain.addBlock(blockchain, transaction);
        } else {
            transaction.signed = false;
        }
    }

    public getBalance(publicKey: string, blockchain: Blockchain) : number{

        let balance = 0;
        for (let i = 0; i < blockchain.blocks.length; i++) {
            const block = blockchain.blocks[i];
            if(block.transaction.receiver == publicKey){
                balance += block.transaction.amount;
            }
            if(block.transaction.sender == publicKey){
                balance -= block.transaction.amount;
            }
        }
        return balance;
    }

    public verifyKeys(publicKey: string, privateKey:string): boolean{

        try{

            const privateKeyObject = createPrivateKey({
                key: privateKey,
                format: 'pem',
                passphrase: 'top secret',
            });

            // Vérifier la signature avec la clé publique
            return verify(
                "sha256",
                Buffer.from(""),
                publicKey,
                sign("sha256", Buffer.from(""), privateKeyObject)
            );

        } catch(err) {
            console.log("Erreur lors de la vérification des clés :" , err);
            return false;
        }
    }
}