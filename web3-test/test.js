const Web3 = require('web3');
const abi = require('./abi').abi1;

(async () => {
    try {

        const web3 = new Web3('http://localhost:7545');      //ganache
        //const web3 = new Web3('http://localhost:8545');      //testnet

        let address = `0x9F1Ba148C194A3Fb741D554C46Def3268006dd35`;         //ganache
        //let address = `0x15588AeD873dB0A5F376d837f38ACEe298d80626`;         //testnet

        let accounts = await web3.eth.getAccounts(); 

        let testContract = web3.eth.Contract(abi,address,{from:accounts[0]});

        let value = await testContract.methods.value().call();
        let value2 = await testContract.methods.getValue().call();

        console.log(value.toNumber(),value2.toNumber());

    } catch (e) {
        console.log(e.toString());
    }
})();