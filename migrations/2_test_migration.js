const TLib = artifacts.require("TLib");
const Test = artifacts.require("Test");

module.exports = function(deployer,network,accounts) {

  if (network == "ganache" || network == "test") {
    let migrate = false;
    deployer.deploy(TLib,{overwrite: migrate});
    deployer.link(TLib,Test);
    deployer.deploy(Test,{overwrite: migrate});
  } else {

  }

};
