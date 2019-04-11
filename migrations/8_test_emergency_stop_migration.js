const TestEmergencyStop = artifacts.require("TestEmergencyStop");

module.exports = async function(deployer,network,accounts) {

  if (network == "ganache" || network == "test") {

    //await deployer.deploy(TestEmergencyStop,{from:accounts[0]});

  } else if(network == "dev"){

  }

};
