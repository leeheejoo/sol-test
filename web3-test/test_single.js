"use strict";

const Web3 = require('web3');
const TestSingleABI = require('./abi').TestSingleABI;

// truffle migrate --network test -f 4 --to 4

(async () => {
    try {
        const web3 = new Web3('http://127.0.0.1:7545');                        //testnet : goerli

        let TLibAddr = "0xC68a7d5F48899BbB819dCa4680b94BB4e9788030";
        let TestSingleAddr = "0x0953E2b41B2B7AcB5a439a7fbA2829565Fa57477";

        let accounts = await web3.eth.getAccounts(); 
        let fromAddr = accounts[0];
        let testSingle = web3.eth.Contract(TestSingleABI,TestSingleAddr);
        let nonce = await web3.eth.getTransactionCount(fromAddr);

        //testnet : goerli
        //let unlock = await web3.eth.personal.unlockAccount(fromAddr,"1234", 600000);

        let value = await testSingle.methods.calcValue().call();
        let multi = await testSingle.methods.getMulti().call();
        console.log(`get value 1 => ${value.toNumber()}, multi ${multi}`);

        let setMulti = 3;

        testSingle.methods.setMultiValue(setMulti).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
        .once('confirmation', async (confirmationNumber, receipt) => {
            let value = await testSingle.methods.calcValue().call();
            let multi = await testSingle.methods.getMulti().call();
            console.log(`get setMultiValue 1 => ${value.toNumber()}, multi ${multi}`);
        })

        let setValue = 222;
        nonce++;

        testSingle.methods.setValue(setValue).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
        .once('confirmation', async (confirmationNumber, receipt) => {
            let value = await testSingle.methods.calcValue().call();
            let multi = await testSingle.methods.getMulti().call();
            console.log(`get setValue 1 => ${value.toNumber()}, multi ${multi}`);
        })

    } catch (e) {
        console.log(e.toString());
    }
})();