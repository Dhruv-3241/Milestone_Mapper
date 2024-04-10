const { dateclashCheck, priorityCheck } = require("../model/tasks");

const { contract } = require("../contract/contract");

const createTask = async (req, res) => {
  //As we know that in Web3 if we pass a data in the form "data.send({from: "The Metamask Address"});" then we are able to add/edit a data stored in the blockchain, but when we try to perform a similar operation here in the server side, it will throw an error because the server side does not have the capability to interact with the blockchain as here we have mentioned just the account and not the private key associated with this account thus the server side has no capability to perform any operation on the smart contract.

  //TestCode ------>

  // await contract.methods.createTask("blockchain", "12/11/2025").send({ from: "0x36cfab9f6251cb4F8A8e2196C410752D7c1B6802" });

  //Fetching date from the body of the request
  const { taskDate } = req.body;
  const task = await dateclashCheck(taskDate);
  //Here we are only checking if there is a clash of dates in task or not and not at all creating a task in smart contract.
  try {
    if (task !== "No Task Found") {
      res
        //409 -----> Represents Conflict
        .status(409)
        .json({ status: 409, message: "Date clash:Task cannot be added" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be added" });
    }
  } catch (error) {
    console.error(error);
  }
};
const updateTask = async (req, res) => {
  const { taskDate } = req.body;
  const task = await dateclashCheck(taskDate);
  try {
    if (task !== "No Task Found") {
      res
        .status(409)
        .json({ status: 409, message: "Date clash:Task cannot be updated" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be updated" });
    }
  } catch (error) {
    console.error(error);
  }
};
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    //Checking if the task is priority or not
    const isTrue = await priorityCheck(taskId);
    console.log(isTrue);
    // const task = await dateclashCheck(taskDate);
    if (isTrue) {
      //403 -----> Forbidden Action
      res.status(403).json({ status: 403, message: "Task cannot be deleted as it has Priority Status" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be deleted" });
    }
  } catch (error) {
    console.error(error);
  }
};
const viewTask = async (req, res) => {
  //Anything declared inside the try block has scope inside the try block only.
  try {
    //The value of the taskId passed in the URL is being fetched and stored in the variable taskId.
    const { taskId } = req.params;
    //We are checking with the smart contract that whether the task with the taskId passed in the URL exists or not.
    const task = await contract.methods.viewTask(taskId).call();
    //If we directly try to send the task object to the client side, it will throw an error because the task object is a big object and it contains a lot of data.
    //So, we are destructuring the task object and storing the id, name, and date in the variables id, name, and date respectively (these are basically the variables created in the smart contract).

    const { id, name, description, date, isPriority} = task;
    //We are converting the id into a number from a big number and storing it in the variable numId.
    //The value of Id returned by the smart contract is in the form "1n" which is a big number (Big INT) representation so we are converting it into a number.
    const numId = Number(id);
    //We are creating a taskObj object which will store the numId, name, description, date and priority of the task.
    const taskObj = {
      numId,
      name,
      description,
      date,
      isPriority
    };
    //Just an if-else condition to check whether the task exists or not.
    // if (task) {
    //   console.log("Success");
    // } else {
    //   console.log("Failure");
    // }
    //We are sending the taskObj object to the client side along with the status 200 and the message "Task Exist".
    res.status(200).json({ status: 200, taskObj, message: "Task Exist" });
  } catch (error) {
    //If there is an error while fetching the task from the smart contract, we are sending the status 500 and the message "Task does not exist".
    res.status(404).json({ status: 500, message: "Task does not exist" });
    //We are also printing the error encountered in order to easily debug the code.
    console.error(error);
  }
};
const allTasks = async (req, res) => {
  try {
    const tasks = await contract.methods.allTask().call();
    // console.log(contract, " ", tasks);
    //Since while writing the smart contract we have not used any functionality to check whether the task list exists or not, so here when we are calling the allTask() function, we are checking that whether the length of the tasks array is less than 0 or not and if it is less than 0, we are sending the status 404 and the message "Task list does not exist".
    //Note:
    // We have not done anything similar to this in the view - task function as there we have already checked in the smart contract that the value of id being passed exists or not and if not then it will throw an appropriate error.
    //Note: Take in consideration that whether we want to check something in the smart contract or on the server side, keep in mind that whenever we are checking anything in the smart contract it will cost some gas where as all the checks done in the server side are "not decentralised" so it is upto the developer to decide where to check as each side has its pros and cons.
    //Pros of checking in the smart contract: It is decentralised and the data is stored on the blockchain.
    //Cons of checking in the smart contract: It will cost some gas.
    //Pros of checking in the server side: It will not cost any gas.
    //Cons of checking in the server side: It is not decentralised and the data is stored on the server.
    if (tasks.length < 0) {
      res
        .status(404)
        .json({ status: 404, message: "Task list does not exist" });
    } else {
      const taskList = tasks.map(({ id, name, description, date, isPriority }) => {
        const taskId = Number(id);
        return { taskId, name, date, description, isPriority};
      });
      res.status(200).json({ status: 200, taskList, message: "Task Exist" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  createTask,
  updateTask,
  deleteTask,
  viewTask,
  allTasks,
};

/************************************************************************************* */

// Another Idea

// const { dateclashCheck, priorityCheck } = require("../model/tasks");
// const { contract } = require("../contract/contract");

// const createTask = async (req, res) => {
//   const { taskcompletiondate } = req.body;
//   const task = await dateclashCheck(taskcompletiondate);
//   try {
//     if (task !== "No Task Found") {
//       res
//         .status(409)
//         .json({ status: 409, message: "Date clash:Task cannot be added" });
//     } else {
//       res.status(200).json({ status: 200, message: "Task can be added" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const updateTask = async (req, res) => {
//   const { taskcompletiondate } = req.body;
//   const task = await dateclashCheck(taskcompletiondate);
//   try {
//     if (task === "No Task Found") {
//       res
//         .status(409)
//         .json({ status: 409, message: "Date clash:Task cannot be updated" });
//     } else {
//       res.status(200).json({ status: 200, message: "Task can be updated" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const deleteTask = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const isTrue = await priorityCheck(taskId);
//     if (isTrue) {
//       res.status(403).json({ status: 403, message: "Task cannot be deleted" });
//     } else {
//       res.status(200).json({ status: 200, message: "Task can be deleted" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const viewTask = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     console.log(taskId);
//     const task = await contract.methods.viewTask(taskId).call();
//     const { id, name, description, deadline, deadlineunit, completiondate } = task;
//     const numId = Number(id);
//     const taskObj = {
//       numId,
//       name,
//       description,
//       deadline,
//       deadlineunit,
//       completiondate,
//     };
//     res.status(200).json({ status: 200, taskObj, message: "Task Exist" });
//   } catch (error) {
//     res.status(404).json({ status: 500, message: "Task does not exist" });
//     console.error(error);
//   }
// };

// const allTask = async (req, res) => {
//   try {
//     const tasks = await contract.methods.allTask().call();
//     if (tasks.length < 0) {
//       res
//         .status(404)
//         .json({ status: 404, message: "Task list does not exist" });
//     } else {
//       const taskList = tasks.map(
//         ({ id, name, description, deadline, deadlineunit, completiondate }) => {
//           const taskId = Number(id);
//           return { taskId, name, description, deadline, deadlineunit, completiondate };
//         }
//       );
//       res.status(200).json({ status: 200, taskList, message: "Task Exist" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const setTaskTimer = async (req, res) => {
//   const { taskId, newdeadline, extendeddeadlineunit } = req.params;
//   const task = await chagetaskdeadline(
//     taskId,
//     newdeadline,
//     extendeddeadlineunit
//   );
//   try {
//     if (task === "No Task Found") {
//       res
//         .status(409)
//         .json({
//           status: 409,
//           message: "Missing Data: Task Deadline cannot be extended",
//         });
//     } else {
//       res
//         .status(200)
//         .json({ status: 200, message: "Task Deadline can be updated" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = {
//   createTask,
//   updateTask,
//   deleteTask,
//   viewTask,
//   allTask,
//   setTaskTimer,
// };

/* ***************************************************************************** */