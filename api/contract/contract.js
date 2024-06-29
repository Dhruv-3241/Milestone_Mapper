//Here we are basically telling the server side that we are going to use the Web3 library to connect to the ETH Sepolia Network"
//Since we are using the "newer version of Web3" i.e. "Version 4.0" so we are using "{}" at the time of calling Web3.
const { Web3 } = require("web3");

//ABI is the Application Binary Interface of the contract deployed by us on the ETH Sepolia Network
const ABI = require("../ABI.json");

//Storing the HTTP Endpoint made by us for ETH Sepolia Network in order to connect with the network
//We got the endpoint using Quicknode website.
const web3 = new Web3(
  "https://clean-practical-dust.ethereum-sepolia.quiknode.pro/5ed3a360d773a1daf25aaf2bce3e5bec5f2d543f/"
);

//Storing the Contact Address through which our contract has been deployed
//The contract Address has also been stored in the FrontEnd portion in Wallet.jsx
const contractAddress = "0x18d937dcd246b1a8564affa8f5847d5c24d343a1";

//Creating an instance of our contract on the server side
const contract = new web3.eth.Contract(ABI, contractAddress);
// console.log(contract);
// const viewTask = async () => {
//     const task = await contract.methods.viewTask(1).call();
//     console.log(task);
// }

// viewTask();

module.exports = { contract };
