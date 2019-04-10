const TestStateMachine = artifacts.require("TestStateMachine");

module.exports = async function(deployer,network,accounts) {

  if (network == "ganache" || network == "test") {

    await deployer.deploy(TestStateMachine,{from:accounts[0]});

  } else if(network == "dev"){

  }

};
