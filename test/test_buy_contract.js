
const TestBuyContract = artifacts.require("../contracts/TestBuyContract.sol");

let Contract;
let ContractAddr = "0x30690465722604b123D63298C26af0102C33f348";

contract("Test", async function(accounts) {
    
    before(async function () {

        Contract = await TestBuyContract.at(ContractAddr, { from: accounts[0] })

    })

    describe('test#1', function () {
        it("basic Test", async () => {

            let amount = web3.utils.toWei("5.5", "ether");

            let ret = await Contract.buyContract({ from: accounts[0], value:amount });

            let balance = await web3.eth.getBalance(Contract.address);

            console.log(`contract balance is ${balance}`);
        });

    });

});