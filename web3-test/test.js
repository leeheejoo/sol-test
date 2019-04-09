"use strict";

const Web3 = require('web3');
const TestVABI = require('./abi').TestVABI;

// ./geth --goerli --rpc --rpcaddr "0.0.0.0" --rpcapi "admin,eth,net,personal,web3" --ws --wsaddr "0.0.0.0" --wsapi "admin,eth,net,personal,web3" --wsorigins="*"
// ./geth attach http://localhost:8545
// ./geth attach ws://localhost:8546

// truffle migrate --network test
// truffle migrate --network test -f 2 --to 2
// truffle migrate --network test -f 3 --to 3

async function makeRawTransaction(web3, fromAddr, contractAddress, nonce, abi) {

    //let chainId = '5777';                   //ganache
    let chainId = '5';                       //testnet : goerli 
    let gasPriceGwei = web3.utils.toWei('2', 'gwei');
    let gasLimit = 210000;

    let rawTransaction = {
        "from": fromAddr,
        "nonce": "0x" + nonce.toString(16),
        "gasPrice": web3.utils.toHex(gasPriceGwei),
        "gasLimit": web3.utils.toHex(gasLimit),
        "to": contractAddress,
        "value": "0x0",
        "data": abi,
        "chainId": web3.utils.toHex(chainId)
    };

    return rawTransaction;
}

async function sendTransction(web3, signedRawTransaction, contract) {

    web3.eth.sendSignedTransaction(signedRawTransaction)
    .on('transactionHash', console.log)
    .once('confirmation', async (confirmationNumber, receipt) => {
        //console.log(confirmationNumber, receipt);

        //get
        let value = await contract.methods.value().call();
        let value2 = await contract.methods.calcValue().call();

        console.log(`get Value ${value.toNumber()}, ${value2.toNumber()}`);
    })
    .on('error',  (error) => {
        console.log(JSON.stringify(error));
    });
}

(async () => {
    try {
        const web3 = new Web3('ws://192.168.56.222:8546');                        //testnet : goerli
        let contractAddress = `0xe2f7495e2FF54eC6245f55095B47653f4Ad28a06`;         //testnet : goerli

        let accounts = await web3.eth.getAccounts(); 
        let fromAddr = accounts[1];
        let testContract = web3.eth.Contract(TestVABI,contractAddress);
        let nonce = await web3.eth.getTransactionCount(fromAddr);

        testContract.events.allEvents({fromBlock: 'latest'})  // ws 방식으로만 가능
        //testContract.events.SetValue({fromBlock: 'latest'})
        .on('data', (event) => {
            console.log(JSON.stringify(event));     // same results as the optional callback above
        })
        .on('changed', (event) => {
            console.log(JSON.stringify(event));     // remove event from local database
        })
        .on('error', (error) => {
            console.log(JSON.stringify(error));
        })


        //testnet : goerli
        let unlock = await web3.eth.personal.unlockAccount(fromAddr,"1234", 600000);

        //set
        let setValue = 222;

        testContract.methods.setValue(setValue).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
        .once('confirmation', async (confirmationNumber, receipt) => {

            let value = await testContract.methods.calcValue().call();
            let multi = await testContract.methods.getMulti().call();
            console.log(`get Value ${value.toNumber()}, multi ${multi}`);
        })

        // let rawTransaction = await makeRawTransaction(web3, fromAddr, contractAddress, nonce, testContract.methods.setValue(setValue).encodeABI());
        // let signedTx = await web3.eth.personal.signTransaction(rawTransaction,"1234");
        // await sendTransction(web3, signedTx.raw, testContract);

        let setMulti = 3;
        nonce++;
        testContract.methods.setMultiValue(setMulti).send({from:fromAddr, nonce:"0x" + nonce.toString(16)})
        .once('confirmation', async (confirmationNumber, receipt) => {

            let value = await testContract.methods.calcValue().call();
            let multi = await testContract.methods.getMulti().call();
            console.log(`get Value ${value.toNumber()}, multi ${multi}`);
        })

        // let rawTransaction2 = await makeRawTransaction(web3, fromAddr, contractAddress, nonce+1, testContract.methods.setMultiValue(setMulti).encodeABI());
        // let signedTx2 = await web3.eth.personal.signTransaction(rawTransaction2,"1234");
        // await sendTransction(web3,  signedTx2.raw, testContract);

    } catch (e) {
        console.log(e.toString());
    }
})();