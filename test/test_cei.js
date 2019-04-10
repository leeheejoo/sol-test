
const TestChecksEffectsInteractions = artifacts.require("../contracts/TestChecksEffectsInteractions.sol");

let Contract;
let ContractAddr = "0x8145c054572Af2daE8Af7540F1ba03cE0973C8b1";

contract("Test", async function(accounts) {
    
    before(async function () {

        Contract = await TestChecksEffectsInteractions.at(ContractAddr, { from: accounts[0] })

    })

    describe('test#1', function () {
        it("basic Test", async () => {

            let amount = web3.utils.toWei("1", "ether");

            let ret = await Contract.deposit({ from: accounts[0], value:amount });

            let balance = await Contract.balance({ from: accounts[0]});

            console.log(`contract balance is ${balance}`);

            ret = await Contract.withdraw(amount, { from: accounts[0]});

           // balance = await Contract.balance({ from: accounts[0]});
           // console.log(`contract balance is ${balance}`);
            
        });

    });

});