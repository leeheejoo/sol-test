"use strict";

const Web3 = require('web3');
const TestSingleABI = require('./abi/abi').TestSingleABI;

// truffle migrate --network test -f 4 --to 4

(async () => {
    try {
        const web3 = new Web3('http://127.0.0.1:7545');                        //testnet : goerli

        let TLibAddr = "0x37D710b601b7430F335b3aFfF6Cf16899B55c4d1";
        let TestSingleAddr = "0x886279D880B09914544C9774AA89fD3c8bCaf28E";

        let accounts = await web3.eth.getAccounts(); 
        let fromAddr = accounts[0];
        let testSingle = web3.eth.Contract(TestSingleABI,TestSingleAddr);
        let nonce = await web3.eth.getTransactionCount(fromAddr);

        //testnet : goerli
        //let unlock = await web3.eth.personal.unlockAccount(fromAddr,"1234", 600000);

        let balance = await web3.eth.getBalance(testSingle.address);
        let balance2 = await testSingle.methods.getEther().call();

        if(balance == balance2.toString()) {
            console.log(`contract balance is ${balance}`);
        }

        let amount = web3.utils.toWei("1", "ether");
        web3.eth.sendTransaction({from:fromAddr, to:TestSingleAddr, value:amount})
        .on('transactionHash', console.log);
        // .once('confirmation', async (confirmationNumber, receipt) => {
        //     console.log('transfer contract sended~~');
        // })


        let to = "0x90d02CC8Aa547BeF1F7A27F83507327EBbeee7C7";
        amount = web3.utils.toWei("1", "ether");
        nonce++;
        testSingle.methods.transferEther(to, amount).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
        .on('transactionHash', console.log);
        // .once('confirmation', async (confirmationNumber, receipt) => {
        //     console.log('contract transferEther sended~~');
        // })

    } catch (e) {
        console.log(e.toString());
    }
})();