
const TestStateMachine = artifacts.require("../contracts/TestStateMachine.sol");

let Tsm;
let StateMachineAddr = "0x74Ea7A29D2384f8218d5871Bc9a2C94A1e255952";

contract("Test", async function(accounts) {
    
    before(async function () {

        Tsm = await TestStateMachine.at(StateMachineAddr, { from: accounts[0] })

    })

    describe('test#1', function () {
        it("basic Test", async () => {

            //let ret = await Tsm.bid({ from: accounts[0] });

            //let ret = await Tsm.reveal({ from: accounts[0] });

            //let ret = await Tsm.determineWinner({ from: accounts[0] });

            let ret = await Tsm.finish({ from: accounts[0] });

            console.log(`       ${ret.logs[0].args.log}`);
        });

    });

});