const Web3 = require('web3');
const abi = require('./abi').abi1;

// ./geth --goerli --rpc --rpcaddr "0.0.0.0" --rpcapi "admin,eth,net,personal,web3" --ws --wsaddr "0.0.0.0" --wsapi "admin,eth,net,personal,web3" --wsorigins="*"
// ./geth attach http://localhost:8545
// ./geth attach ws://localhost:8546

// truffle migrate --network dev


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
        const web3 = new Web3('http://192.168.56.222:8545');                        //testnet : goerli
        let contractAddress = `0x9f052Cd54ac0187F42736E4cE31F0757f10e881a`;         //testnet : goerli

        let accounts = await web3.eth.getAccounts(); 
        let fromAddr = accounts[0];
        let testContract = web3.eth.Contract(abi,contractAddress);
        let nonce = await web3.eth.getTransactionCount(fromAddr);

        //testnet : goerli
        //let unlock = await web3.eth.personal.unlockAccount(fromAddr,"1234", 600000);

        //set
        let setValue = 222;
        let rawTransaction = await makeRawTransaction(web3, fromAddr, contractAddress, nonce, testContract.methods.setValue(setValue).encodeABI());
        let signedTx = await web3.eth.personal.signTransaction(rawTransaction,"1234");
        await sendTransction(web3, signedTx.raw, testContract);

        let setMulti = 3;
        let rawTransaction2 = await makeRawTransaction(web3, fromAddr, contractAddress, nonce+1, testContract.methods.setMultiValue(setMulti).encodeABI());
        let signedTx2 = await web3.eth.personal.signTransaction(rawTransaction2,"1234");
        await sendTransction(web3,  signedTx2.raw, testContract);

    } catch (e) {
        console.log(e.toString());
    }
})();