const Crimes = artifacts.require("Crimes");

module.exports = function (deployer) {
  deployer.deploy(Crimes);
};
