"use strict";

const Web3 = require('web3');
const TestProxyABI = require('./abi').TestProxyABI;
const TestInterfaceABI = require('./abi').TestInterfaceABI;
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
            console.log(`get Value ${value.toNumber()}, multi ${multi}`);
        }
    })
    .on('error',  (error) => {
        console.log(JSON.stringify(error));
    });
}


(async () => {
    try {
        const web3 = new Web3('http://127.0.0.1:7545');                        //testnet : goerli

        let TLibAddr = "0xB2d9f008ad03E80b256c55A01d9FB05514b6831e";
        let TestV1Addr = "0xA35592467426D4C303fd22cc9D1f30E01cAd853F";
        let TestV2Addr = "0xC4fC019A197bAe978675F70775d0dFD123429Cb6";
        let TestProxyAddr = "0xE756A02dc04a5a6B7437Bb067Ce0cD1f058fF9b6";

        let accounts = await web3.eth.getAccounts(); 
        let fromAddr = accounts[0];
        let fromPrivateKey =  new Buffer('7d6971f9b82459891e87f4457ce8c1b952907289cea58f6724634676f0657627', 'hex');
        let testInterface = web3.eth.Contract(TestInterfaceABI,TestProxyAddr);
        let testProxy = web3.eth.Contract(TestProxyABI,TestProxyAddr);
        let nonce = await web3.eth.getTransactionCount(fromAddr);

        //testnet : goerli
        //let unlock = await web3.eth.personal.unlockAccount(fromAddr,"1234", 600000);

        //set
        let rawTransaction = await makeRawTransaction(web3, fromAddr, TestProxyAddr, nonce, testProxy.methods.setTargetAddress(TestV1Addr).encodeABI());
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

    } catch (e) {
        console.log(e.toString());
    }
})();