"use strict";

const Web3 = require('web3');
const TestVABI = require('../abi/abi').TestVABI;
const TestProxyABI = require('../abi/abi').TestProxyABI;
const TestInterfaceABI = require('../abi/abi').TestInterfaceABI;
const Tx = require('ethereumjs-tx');

// ./geth --goerli --rpc --rpcaddr "0.0.0.0" --rpcapi "admin,eth,net,personal,web3" --ws --wsaddr "0.0.0.0" --wsapi "admin,eth,net,personal,web3" --wsorigins="*"
// ./geth attach http://localhost:8545
// ./geth attach ws://localhost:8546

// truffle migrate --network test
// truffle migrate --network test -f 2 --to 2
// truffle migrate --network test -f 3 --to 3

async function makeRawTransaction(web3, fromAddr, contractAddress, nonce, abi) {

    let chainId = '5777';                   //ganache
    //let chainId = '5';                       //testnet : goerli 
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

        if(contract){
            let value = await contract.methods.calcValue().call();
            let multi = await contract.methods.getMulti().call();
            console.log(`get Value ${value.toNumber()}, multi ${multi.toNumber()}`);
        }
    })
    .on('error',  (error) => {
        console.log(error);
    });
}


(async () => {
    try {
        const web3 = new Web3('http://127.0.0.1:7545');                        //testnet : goerli

        let TLibAddr = "0x27A4aBc2787A370aCfBE10D09668d395ADDD25E6";
        let TestV1Addr = "0x077F725808309D71CCD4CC9EC142783B57e69e92";
        let TestV2Addr = "0xd0BcfDcD2BC78CB10927317d9ca191A3613a5057";
        let TestProxyAddr = "0xC6A65E2D336EEeb4cba92AB8abC40d7e9e42693a";

        let accounts = await web3.eth.getAccounts(); 
        let fromAddr = accounts[0];
        let fromPrivateKey =  new Buffer('7d6971f9b82459891e87f4457ce8c1b952907289cea58f6724634676f0657627', 'hex');
        let testV1 = web3.eth.Contract(TestVABI,TestV1Addr);
        let testInterface = web3.eth.Contract(TestInterfaceABI,TestProxyAddr);
        let testProxy = web3.eth.Contract(TestProxyABI,TestProxyAddr);
        let nonce = await web3.eth.getTransactionCount(fromAddr);

        //testnet : goerli
        //let unlock = await web3.eth.personal.unlockAccount(fromAddr,"1234", 600000);

        //set
        let rawTransaction = await makeRawTransaction(web3, fromAddr, TestProxyAddr, nonce, testProxy.methods.setTargetAddress(TestV2Addr).encodeABI());
        let tx = new Tx(rawTransaction);
        tx.sign(fromPrivateKey);
        await sendTransction(web3, tx.serialize().toString('hex'));

        let setMulti = 1;
        nonce++;
        rawTransaction = await makeRawTransaction(web3, fromAddr, TestProxyAddr, nonce, testInterface.methods.setMultiValue(setMulti).encodeABI());
        tx = new Tx(rawTransaction);
        tx.sign(fromPrivateKey);
        await sendTransction(web3, tx.serialize().toString('hex'), testInterface);

        let setValue = 222;
        nonce++;
        rawTransaction = await makeRawTransaction(web3, fromAddr, TestProxyAddr, nonce, testInterface.methods.setValue(setValue).encodeABI());
        tx = new Tx(rawTransaction);
        tx.sign(fromPrivateKey);
        await sendTransction(web3, tx.serialize().toString('hex'), testInterface);
/*
        nonce++;
        rawTransaction = await makeRawTransaction(web3, fromAddr, TestProxyAddr, nonce, testProxy.methods.setTargetAddress(TestV2Addr).encodeABI());
        tx = new Tx(rawTransaction);
        tx.sign(fromPrivateKey);
        await sendTransction(web3, tx.serialize().toString('hex'));

        nonce++;
        rawTransaction = await makeRawTransaction(web3, fromAddr, TestProxyAddr, nonce, testInterface.methods.setMultiValue(setMulti).encodeABI());
        tx = new Tx(rawTransaction);
        tx.sign(fromPrivateKey);
        await sendTransction(web3, tx.serialize().toString('hex'), testInterface);

        nonce++;
        rawTransaction = await makeRawTransaction(web3, fromAddr, TestProxyAddr, nonce, testInterface.methods.setValue(setValue).encodeABI());
        tx = new Tx(rawTransaction);
        tx.sign(fromPrivateKey);
        await sendTransction(web3, tx.serialize().toString('hex'), testInterface);
*/
    } catch (e) {
        console.log(e.toString());
    }
})();