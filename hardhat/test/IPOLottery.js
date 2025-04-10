const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IPOLottery", function () {
  let ipoLottery, registrar, sebi, others;

  beforeEach(async function () {
    [registrar, sebi, ...others] = await ethers.getSigners();

    const IPOLottery = await ethers.getContractFactory("IPOLottery", registrar);
    ipoLottery = await IPOLottery.deploy(2, sebi.address); // 2 winners
    await ipoLottery.waitForDeployment();
  });

  it("should set the correct registrar and SEBI", async function () {
    expect(await ipoLottery.registrar()).to.equal(registrar.address);
    expect(await ipoLottery.sebi()).to.equal(sebi.address);
  });

  it("should allow registrar to add hashed applicants", async function () {
    const dematId = "IN1234567890";
    const hash = ethers.keccak256(ethers.toUtf8Bytes(dematId));

    await ipoLottery.addHashedApplicant(hash);
    const applicants = await ipoLottery.getAllApplicantHashes();

    expect(applicants.length).to.equal(1);
    expect(applicants[0]).to.equal(hash);
  });

  it("should run lottery and select winners", async function () {
    // Add applicants
    for (let i = 0; i < 5; i++) {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("ID" + i));
      await ipoLottery.addHashedApplicant(hash);
    }

    // Seeds from registrar and SEBI
    await ipoLottery.submitRegistrarSeed(12345);
    await ipoLottery.connect(sebi).submitSEBISeed(67890);

    await ipoLottery.connect(sebi).runLottery();

    const winners = await ipoLottery.getWinnerHashes();
    expect(winners.length).to.equal(2);
  });
});
