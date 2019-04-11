
const TestEmergencyStop = artifacts.require("../contracts/TestEmergencyStop.sol");

let Contract;
let ContractAddr = "0xf0ac9565F5b571e714438A1E869Bf8a5E310e9C4";

contract("Test", async function(accounts) {
    
    before(async function () {

        Contract = await TestEmergencyStop.at(ContractAddr, { from: accounts[0] })

    })

    describe('test#1', function () {

        it("emergency stop Test", async () => {

            let ret = await Contract.deposit({ from: accounts[0]});
            console.log(`       ${ret.logs[0].args.message}`);

            ret = await Contract.stopContract({ from: accounts[0]});
    
            ret = await Contract.emergencyWithdraw({ from: accounts[0]});
            console.log(`       ${ret.logs[0].args.message}`);

            //ret = await Contract.deposit({ from: accounts[0]});
            //console.log(`       ${ret.logs[0].args.message}`);

            ret = await Contract.resumeContract({ from: accounts[0]});

            //ret = await Contract.emergencyWithdraw({ from: accounts[0]});
            //console.log(`       ${ret.logs[0].args.message}`);

            ret = await Contract.deposit({ from: accounts[0]});
            console.log(`       ${ret.logs[0].args.message}`);
        });
    });

});