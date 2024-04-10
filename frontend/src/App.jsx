// import { useState } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import CreateTask from "./pages/CreateTask";
// import Wallet from "./pages/Wallet";
// import ViewAllTasks from "./pages/ViewAllTasks";
// import UpdateTask from "./pages/UpdateTask";
// import ViewTask from "./pages/ViewTask";
// import DeleteTask from "./pages/DeleteTask";
// import SetTimer from "./pages/SetTimer";

// import "./App.css";

// function App() {

//   //Using the use state hook to set the state of the web3, contract and account
//   const [state, setState] = useState({
//     web3: null,
//     contract: null,
//     account: null,
//   });

//   //Function to set the state of the web3, contract and account using the saveState function
//   const saveState = ({ web3, contract, account }) => {
//     setState({ web3: web3, contract: contract, account: account });
//   };

//   //Creating the routers for the application
//   //Whereever we need to update the contract we will be needing the states
//   const router = createBrowserRouter([
//     //Passing the saveState function to the Wallet component to be used in Wallet.jsx
//     { path: "/", element: <Wallet saveState={saveState} /> },
//     { path: "/view-all-tasks", element: <ViewAllTasks /> },
//     { path: "/create-task", element: <CreateTask state={state} /> },
//     { path: "/view-task", element: <ViewTask /> },
//     { path: "/update-task", element: <UpdateTask state={state} /> },
//     { path: "/delete-task", element: <DeleteTask state={state} /> },
//     { path: "/settimer", element: <SetTimer state={state} /> },
//   ]);

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import Wallet from "./pages/Wallet";
import ViewAllTasks from "./pages/ViewAllTasks";
import UpdateTask from "./pages/UpdateTask";
import ViewTask from "./pages/ViewTask";
import DeleteTask from "./pages/DeleteTask";
import HomePage from "../src/components/HomePage/Homepage";

import "./App.css";

function App() {
  //Using the use state hook to set the state of the web3, contract and account
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: null,
  });

  //Function to set the state of the web3, contract and account using the saveState function
  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account });
  };
  const router = createBrowserRouter([
    //Passing the saveState function to the Wallet component to be used in Wallet.jsx, since we want to send some data from the wallet component (Child Component) to the App Component (Parent Component) so thats why we are using usestate functionality where we are passing the saveState function as a prop in the Wallet component.
    { path: "/", element: <HomePage /> },
    { path: "/wallet", element: <Wallet saveState={saveState} /> },
    { path: "/view-all-tasks", element: <ViewAllTasks state={state} /> },
    //passing the state as a prop to the CreateTask component as it contains the value of all the variables (web3, contract, account) that are needed to interact with the blockchain.
    //This is done so that we can use the contract instance in the CreateTask component to interact with the blockchain.
    //We will be passing the state as a prop to all the paths where we need to interact with the blockchain i.e. we need to edit/update anything in the smart contract.
    { path: "/create-task", element: <CreateTask state={state} /> },
    { path: "/view-task", element: <ViewTask /> },
    { path: "/update-task", element: <UpdateTask state={state} /> },
    { path: "/delete-task", element: <DeleteTask state={state} /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
