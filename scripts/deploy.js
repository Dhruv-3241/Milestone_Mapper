async function main() {
    const Milestone_Mapper = await ethers.getContractFactory("Milestone_Mapper");

    const instance1 = await Milestone_Mapper.deploy();
    console.log("Milestone_Mapper deployed to:", instance1.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });