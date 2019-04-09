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

        let TLibAddr = "0x421A34A4d17bb85D4a20c319ad2aC4eb173bfBAD";
        let TestV1Addr = "0x507fEfD0E0D415ccb4f9bE85a9CA0Ef2418e8CfD";
        let TestV2Addr = "0x15Eb39259F6E6DA532Bdd62D9ba24233163A5a71";
        let TestProxyAddr = "0xA2988b20Aa5c1C2fD00a4BAf8C1a00Aa22F90021";

        let accounts = await web3.eth.getAccounts(); 
        let fromAddr = accounts[0];
        let testInterface = web3.eth.Contract(TestInterfaceABI,TestProxyAddr);
        let testProxy = web3.eth.Contract(TestProxyABI,TestProxyAddr);
        let nonce = await web3.eth.getTransactionCount(fromAddr);

        //testnet : goerli
        //let unlock = await web3.eth.personal.unlockAccount(fromAddr,"1234", 600000);

        //set
        (async () => {
            testProxy.methods.setTargetAddress(TestV1Addr).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
            .once('confirmation', async (confirmationNumber, receipt) => {
                console.log(`setTargetAddress 1`);
            })
        })();

          
        nonce++;

        (async () => {
            testInterface.methods.init().send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
            .once('confirmation', async (confirmationNumber, receipt) => {
                console.log(`init 1`);
            })
        })();

        let setMulti = 1;
        nonce++;

        (async () => {
            testInterface.methods.setMultiValue(setMulti).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
            .once('confirmation', async (confirmationNumber, receipt) => {
                let value = await testInterface.methods.calcValue().call();
                let multi = await testInterface.methods.getMulti().call();
                console.log(`get setMultiValue 1 => ${value.toNumber()}, multi ${multi}`);
            })
        })();

        let setValue = 222;
        nonce++;

        (async () => {
            testInterface.methods.setValue(setValue).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
            .once('confirmation', async (confirmationNumber, receipt) => {
                let value = await testInterface.methods.calcValue().call();
                let multi = await testInterface.methods.getMulti().call();
                console.log(`get Value 1 => ${value.toNumber()}, multi ${multi}`);
            })
        })();

/*
        nonce++;

        (async () => {
            testProxy.methods.setTargetAddress(TestV2Addr).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
            .once('confirmation', async (confirmationNumber, receipt) => {
                console.log(`setTargetAddress 2`);
            })
        })();

        nonce++;

        (async () => {
            testInterface.methods.setValue(setValue).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
            .once('confirmation', async (confirmationNumber, receipt) => {
                let value = await testInterface.methods.calcValue().call();
                let multi = await testInterface.methods.getMulti().call();
                console.log(`get Value 2 => ${value.toNumber()}, multi ${multi}`);
            })
        })();

        nonce++;

        (async () => {
            testInterface.methods.setMultiValue(setMulti).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
            .once('confirmation', async (confirmationNumber, receipt) => {
                let value = await testInterface.methods.calcValue().call();
                let multi = await testInterface.methods.getMulti().call();
                console.log(`get setMultiValue 2 => ${value.toNumber()}, multi ${multi}`);
            })
        })();
*/
    } catch (e) {
        console.log(e.toString());
    }
})();