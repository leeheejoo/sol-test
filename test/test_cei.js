
const TestChecksEffectsInteractions = artifacts.require("../contracts/TestChecksEffectsInteractions.sol");

let Contract;
let ContractAddr = "0x22E1931Bc1601bD4027E0816B713BA543cD82A80";

contract("Test", async function(accounts) {
    
    before(async function () {

        Contract = await TestChecksEffectsInteractions.at(ContractAddr, { from: accounts[0] })

    })

    describe('test#1', function () {

        // it("basic Test", async () => {

        //     let amount = web3.utils.toWei("1", "ether");

        //     let ret = await Contract.deposit({ from: accounts[0], value:amount });

        //     let balance = await Contract.balance({ from: accounts[0]});

        //     console.log(`contract balance is ${balance}`);

        //     ret = await Contract.withdraw(amount, { from: accounts[0]});

        //     balance = await Contract.balance({ from: accounts[0]});
        //     console.log(`contract balance is ${balance}`);
            
        // });

        it("get array Test", async () => {

            for(let i = 0; i < 10; i++){
                let amount = web3.utils.toWei(i.toString(), "wei");
                let ret = await Contract.deposit({ from: accounts[i], value:amount });
            }

            let ret = await Contract.balanceArray({ from: accounts[0]});

            console.log(`contract address is ${ret[0]}`);
            console.log(`contract balance is ${ret[1]}`);
        });
    });

});