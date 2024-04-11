const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/Milestone_Mapper.sol/Milestone_Mapper.json");
const abi = contract.abi;

const { JsonRpcProvider } = require('@ethersproject/providers');

const provider = new JsonRpcProvider(API_URL);

//Signer - Us(The persons who owns the contract and validates the transactions)
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

//Creating an instance of the contract using the abi and the signer
const Milestone_Mapper = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

async function main() {
    //Calling the getMilestone function from the contract
    const milestone = await Milestone_Mapper.allTask();
    console.log("Milestone:", milestone.toString());

    //Calling the getMilestone function from the contract
    // const task = await Milestone_Mapper.createTask("Task 1", "Task 1 Description", 10/11/2023, "false");
    // await task.wait();
    // console.log("Task created");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }); 

module.exports = { Milestone_Mapper };