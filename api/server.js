//Declaring that we will be using the Express Framework of node.js
const express = require("express");
//Declaring that we will be using cors for cross-origin requests
const cors = require('cors');
//Declaring the variable tasks which will load the routes from the routes.js file
const tasks = require("./routes/routes");
const bodyParser = require('body-parser');
//Creating an instance of the express framework and storing it in the variable "app"
const app = express();

//Data Flow/Request Flow in the application:

//user-/api/ethereum/create-task -> server.js -> routes.js -> controller.js -> tasks.js

//Using the cors middleware to allow cross-origin requests
app.use(cors({
  origin: 'https://milestone-mapper.onrender.com',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
//Using the express.json() middleware to parse the incoming request body
app.use(express.json());
//Using the tasks route to handle the incoming requests
app.use("/api/ethereum", tasks);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Declaring the PORT number on which the server will run
const PORT = 4000;
//Telling the server to listen on the PORT number declared above
app.listen(PORT, '0.0.0.0', ()=> {
  console.log(`Server Running At PORT ${PORT}`);
});

/*  ************************************************************* */

// const express = require("express");
// const cors = require("cors");
// const { Web3 } = require("web3");
// const ABI = require("../api/ABI.json");

// const app = express();
// //Suing middleware to convert then data into JSON format basically to accept data in JSON Format.
// app.use(express.json());
// app.use(cors());

// const web3 = new Web3(
//   "https://clean-practical-dust.ethereum-sepolia.quiknode.pro/5ed3a360d773a1daf25aaf2bce3e5bec5f2d543f/"
// );
// const contractAddress = "0xfccfe5b3be8b8975368572c3dc94d6f39b0fcc90";

// const contract = new web3.eth.Contract(ABI, contractAddress);
// console.log(contract);
// const viewTask = async () => {
//     const task = await contract.methods.viewTask(1).call();
//     console.log(task);
// }

// viewTask();

// app.post("/api/ethereum/create-task", async (req, res) => {
//   //As we know that in Web3 if we pass a data in the form "data.send({from: "The Metamask Address"});" then we are able to add/edit a data stored in the blockchain, but when we try to perform a similar operation here in the server side, it will throw an error because the server side does not have the capability to interact with the blockchain as here we have mentioned just the account and not the private key associated with this account thus the server side has no capability to perform any operation on the smart contract.

//   //TestCode ------>

//   // await contract.methods.createTask("blockchain", "12/11/2025").send({ from: "0x36cfab9f6251cb4F8A8e2196C410752D7c1B6802" });

//   //Fetching date from the body of the request
//   const { taskDate } = req.body;
//   const task = await dateclashCheck(taskDate);
//   //Here we are only checking if there is a clash of dates in task or not and not at all creating a task in smart contract.
//   try {
//     if (task !== "No Task Found") {
//       res
//         //409 -----> Represents Conflict
//         .status(409)
//         .json({ status: 409, message: "Date clash:Task cannot be added" });
//     } else {
//       res.status(200).json({ status: 200, message: "Task can be added" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.get("/api/ethereum/view-task/:taskId", async (req, res) => {
// //Anything declared inside the try block has scope inside the try block only.
// try {
//   //The value of the taskId passed in the URL is being fetched and stored in the variable taskId.
//   const { taskId } = req.params;
//   //We are checking with the smart contract that whether the task with the taskId passed in the URL exists or not.
//   const task = await contract.methods.viewTask(taskId).call();
//   //If we directly try to send the task object to the client side, it will throw an error because the task object is a big object and it contains a lot of data.
//   //So, we are destructuring the task object and storing the id, name, and date in the variables id, name, and date respectively (these are basically the variables created in the smart contract).

//   const { id, name, date } = task;
//   //We are converting the id into a number from a big number and storing it in the variable numId.
//   //The value of Id returned by the smart contract is in the form "1n" which is a big number (Big INT) representation so we are converting it into a number.
//   const numId = Number(id);
//   //We are creating a taskObj object which will store the numId, name, and date of the task.
//   const taskObj = {
//     numId,
//     name,
//     date,
//   };
//   //Just an if-else condition to check whether the task exists or not.
//   // if (task) {
//   //   console.log("Success");
//   // } else {
//   //   console.log("Failure");
//   // }
//   //We are sending the taskObj object to the client side along with the status 200 and the message "Task Exist".
//   res.status(200).json({ status: 200, taskObj, message: "Task Exist" });
// } catch (error) {
//   //If there is an error while fetching the task from the smart contract, we are sending the status 500 and the message "Task does not exist".
//   res.status(404).json({ status: 500, message: "Task does not exist" });
//   //We are also printing the error encountered in order to easily debug the code.
//   console.error(error);
// }
// });

// app.get("/api/ethereum/view-all-tasks", async (req, res) => {
// try {
//   const tasks = await contract.methods.allTask().call();
//   //Since while writing the smart contract we have not used any functionality to check whether the task list exists or not, so here when we are calling the allTask() function, we are checking that whether the length of the tasks array is less than 0 or not and if it is less than 0, we are sending the status 404 and the message "Task list does not exist".
//   //Note:
//   // We have not done anything similar to this in the view - task function as there we have already checked in the smart contract that the value of id being passed exists or not and if not then it will throw an appropriate error.
//   //Note: Take in consideration that whether we want to check something in the smart contract or on the server side, keep in mind that whenever we are checking anything in the smart contract it will cost some gas where as all the checks done in the server side are "not decentralised" so it is upto the developer to decide where to check as each side has its pros and cons.
//   //Pros of checking in the smart contract: It is decentralised and the data is stored on the blockchain.
//   //Cons of checking in the smart contract: It will cost some gas.
//   //Pros of checking in the server side: It will not cost any gas.
//   //Cons of checking in the server side: It is not decentralised and the data is stored on the server.
//   if (tasks.length < 0) {
//     res
//       .status(404)
//       .json({ status: 404, message: "Task list does not exist" });
//   } else {
//     const taskList = tasks.map(({ id, name, date }) => {
//       const taskId = Number(id);
//       return { taskId, name, date };
//     });
//     res.status(200).json({ status: 200, taskList, message: "Task Exist" });
//   }
// } catch (error) {
//   console.error(error);
// }
// });

// app.post("/api/ethereum/update-task", async (req, res) => {
//   const { taskDate } = req.body;
//   const task = await dateclashCheck(taskDate);
//   try {
//     if (task !== "No Task Found") {
//       res
//         .status(409)
//         .json({ status: 409, message: "Date clash:Task cannot be updated" });
//     } else {
//       res.status(200).json({ status: 200, message: "Task can be updated" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.delete("/api/ethereum/delete-task", async (req, res) => {
//   try {
//     const { taskId } = req.body;
//     //Checking if the task is priority or not
//     const isTrue = await priorityCheck(taskId);
//     // const task = await dateclashCheck(taskDate);
//     if (isTrue) {
//       //403 -----> Forbidden Action
//       res.status(403).json({ status: 403, message: "Task cannot be deleted" });
//     } else {
//       // try {
//       //   if (task !== "No Task Found") {
//       //     res
//       //       .status(409)
//       //       .json({
//       //         status: 409,
//       //         message: "Date clash:Task cannot be deleted",
//       //       });
//       //   } else {
//       //     res.status(200).json({ status: 200, message: "Task can be deleted" });
//       //   }
//       // } catch (error) {
//       //   console.error(error);
//       // }
//       res.status(200).json({ status: 200, message: "Task can be deleted" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(
//     `Server Running At PORT ${PORT} and link is http://localhost:${PORT}`
//   );
// });

/***************************************************************************************** */