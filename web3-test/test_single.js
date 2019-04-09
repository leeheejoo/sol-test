"use strict";

const Web3 = require('web3');
const TestSingleABI = require('./abi').TestSingleABI;

// truffle migrate --network test -f 4 --to 4

(async () => {
    try {
        const web3 = new Web3('http://127.0.0.1:7545');                        //testnet : goerli

        let TLibAddr = "0x5ffd14b5Cd0efba05Ecc27BFa9dAC6A022a36Df9";
        let TestSingleAddr = "0x9aEdbdb33621f93f2FA1124E8214c3301fdcd02A";

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