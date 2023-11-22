const hre = require("hardhat");

async function main() {
  const initBalance = 0; // Set initial balance to 0
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy(initBalance);
  await assessment.deployed();

  console.log(`A contract with an initial balance of ${initBalance} eth deployed to ${assessment.address}`);

  // Now, let's update the balance by calling cubeSeries with the value of 2
  const updatedBalance = await assessment.cubeSeries(3);
  console.log(`Balance updated to ${updatedBalance} eth`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
