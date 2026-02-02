const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "MATIC");

    // Deploy Factory
    const RentChainFactory = await hre.ethers.getContractFactory("RentChainFactory");
    const factory = await RentChainFactory.deploy();

    await factory.waitForDeployment();

    const factoryAddress = await factory.getAddress();
    console.log("RentChainFactory deployed to:", factoryAddress);

    console.log("\n✅ Deployment complete!");
    console.log("Update FACTORY_ADDRESS in web/src/hooks/useRentChain.ts with:", factoryAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
