const Adoption = artifacts.require("Adoption");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Adoption", accounts => {
  
  describe('First group of tests', () => {
    let instance;

    before(async () => {
      instance = await Adoption.deployed();
    })

    it('User should adopt a pet', async () => {
      await instance.adopt.sendTransaction(8, {from: accounts[0]})
      let adopter = await instance.adopters.call(8)
      assert.equal(adopter, accounts[0], "Incorrect owner addresss")
    })
    
    it('Should get adopter address by pet id in array', async () => {
      let adopters = await instance.getAdopters.call();
      assert.equal(adopters[8], accounts[0], "Owner of pet id should be recorded in the array")
    })

    it('Should throw if invidalid pet id is given', async () => {
      try {
        await instance.adopt.sendTransaction(18, {from: accounts[0]})
        assert.fail(true, false, "This function did not throw");
      } catch (error) {
        assert.include(String(error), "revert", `Expected "revert" but instead got ${error}`)
      }
    })


  })
});
