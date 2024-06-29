// "web3": "^1.9.0" is not working
import PropTypes from "prop-types";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import ABI from "./ABI.json";

//Passing saveState as a prop to the Wallet component inorder to export the values of the web3, contract and account to the App component
const Wallet = ({ saveState }) => {
  const navigateTo = useNavigate();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(accounts);
        
        //The contract Address has also been stored in the FrontEnd portion in contract.js
        const contractAddress = "0x193067c5287bd203f1458b2b437087a4b1db02f0";
        const contract = new web3.eth.Contract(ABI, contractAddress);

        // console.log(contract);

        //We are saving the accounts[0] in the account variable as we are only using the first account present in the accounts array (return type is array)
        saveState({ web3: web3, contract: contract, account: accounts[0] });
        //Using NavigateTo function to navigate to the view all tasks page by default after connecting the wallet
        navigateTo("/view-all-tasks");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="wallet_header ">
        <span>WELCOME TO</span> <p>Milestone Mapper</p>
      </div>
      <div className="container">
        <div className="connect_wallet_section todo_btn">
          <p> Please connect metamask wallet to access the app </p>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      </div>
    </>
  );
};

//Inorder to counter the "React eslint error missing in props validation" error we are using the prop types
Wallet.propTypes = {
  saveState: PropTypes.func.isRequired,
};

export default Wallet;

/******************************************************************************************** */

// Another Way 

// import PropTypes from "prop-types";
// import Web3 from "web3";
// import { useNavigate } from "react-router-dom";
// import ABI from "./ABI.json";

// const Wallet = ({ saveState }) => {
//   const navigateTo = useNavigate();
//   const connectWallet = async () => {
//     try {
//       //Checking if the metamask exists or not
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         //EHere we are requesting the connection of accounts from the metamask wallet
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });

//         //Storing the Contact Address through which our contract has been deployed
//         const contractAddress = "0x6dd884c98ca087da1dfd0474e80de5c77f591e43";

//         //Creating an instance of our contract on the server side
//         const contract = new web3.eth.Contract(ABI, contractAddress);

//         //Setting the state of the web3, contract and account
//         //This is done by calling the saveState function that is being passed as a prop to the Wallet component
//         //Since the account is an array, we are passing the first account in the array
//         saveState({ web3: web3, contract: contract, account: accounts[0] });

//         //will help us to navigate to the view all tasks page by default after connecting the wallet
//         navigateTo("/view-all-tasks");

//       } else {
//         throw new Error();
//       }
//     } catch (error) {
//       //Printing the error that is being faced.
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <div className="wallet_header ">
//         <span>WELCOME TO</span> <p>Personal Manager</p>
//       </div>
//       <div className="connect_wallet_section todo_btn">
//         <p> Please connect metamask wallet to access the app </p>
//         <button onClick={connectWallet}>Connect Wallet</button>
//       </div>
//     </>
//   );
// };

// //Inorder to counter the "React eslint error missing in props validation" error we are using the prop types
// Wallet.propTypes = {
//   saveState: PropTypes.func.isRequired,
// };

// export default Wallet;

