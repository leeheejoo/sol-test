const TestChecksEffectsInteractions = artifacts.require("TestChecksEffectsInteractions");

module.exports = async function(deployer,network,accounts) {

  if (network == "ganache" || network == "test") {

    //await deployer.deploy(TestChecksEffectsInteractions,{from:accounts[0]});

  } else if(network == "dev"){

  }

};
