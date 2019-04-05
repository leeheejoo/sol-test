const Test = artifacts.require("Test");

module.exports = function(deployer,network,accounts) {

  if (network == "ganache" || network == "test") {
    deployer.deploy(Test, {overwrite: false});
  } else {

  }

};
