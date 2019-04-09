"use strict";

const Web3 = require('web3');
const TestProxyABI = require('./abi').TestProxyABI;
const TestInterfaceABI = require('./abi').TestInterfaceABI;

// ./geth --goerli --rpc --rpcaddr "0.0.0.0" --rpcapi "admin,eth,net,personal,web3" --ws --wsaddr "0.0.0.0" --wsapi "admin,eth,net,personal,web3" --wsorigins="*"
// ./geth attach http://localhost:8545
// ./geth attach ws://localhost:8546

// truffle migrate --network test
// truffle migrate --network test -f 2 --to 2
// truffle migrate --network test -f 3 --to 3


(async () => {
    try {
        const web3 = new Web3('http://127.0.0.1:7545');                        //testnet : goerli

        let TLibAddr = "0xB2d9f008ad03E80b256c55A01d9FB05514b6831e";
        let TestV1Addr = "0xA35592467426D4C303fd22cc9D1f30E01cAd853F";
        let TestV2Addr = "0xC4fC019A197bAe978675F70775d0dFD123429Cb6";
        let TestProxyAddr = "0xE756A02dc04a5a6B7437Bb067Ce0cD1f058fF9b6";

        let accounts = await web3.eth.getAccounts(); 
        let fromAddr = accounts[0];
        let testInterface = web3.eth.Contract(TestInterfaceABI,TestProxyAddr);
        let testProxy = web3.eth.Contract(TestProxyABI,TestProxyAddr);
        let nonce = await web3.eth.getTransactionCount(fromAddr);

        //testnet : goerli
        //let unlock = await web3.eth.personal.unlockAccount(fromAddr,"1234", 600000);

        //set
        let setValue = 222;

        testInterface.methods.setValue(setValue).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
        .once('confirmation', async (confirmationNumber, receipt) => {

            let value = await testInterface.methods.calcValue().call();
            let multi = await testInterface.methods.getMulti().call();
            console.log(`get Value ${value.toNumber()}, multi ${multi}`);
        })

        let setMulti = 1;
        nonce++;
        testInterface.methods.setMultiValue(setMulti).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
        .once('confirmation', async (confirmationNumber, receipt) => {

            let value = await testInterface.methods.calcValue().call();
            let multi = await testInterface.methods.getMulti().call();
            console.log(`get Value ${value.toNumber()}, multi ${multi}`);
        })

        nonce++;
        testProxy.methods.setTargetAddress(TestV2Addr).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
        .once('confirmation', async (confirmationNumber, receipt) => {

           let a = 0;
        })

    } catch (e) {
        console.log(e.toString());
    }
})();