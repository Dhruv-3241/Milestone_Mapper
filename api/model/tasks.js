const { contract } = require("../contract/contract");

const dateclashCheck = async (taskDate) => {
  //Fetching all the tasks as we need to check clash of dates with any of the tasks.
  const tasks = await contract.methods.allTask().call();
  //Checking if any clash exists
  const foundTask = tasks.find((task) => task.date === taskDate);

  //If clash exists returning the name of the already existing task.
  if (foundTask) {
    return foundTask.name;
  }
  return "No Task Found";
};

const priorityCheck = async (id) => {
  const tasks = await contract.methods.allTask().call();
  //Here we are just checking that if at the time of creation of the task the isPriority was set to true or not.
  console.log(tasks[id - 1].isPriority);
  console.log(tasks[id - 1].name);
  const result = tasks[id-1].isPriority;
  return result;
};

module.exports = { dateclashCheck, priorityCheck };

/***************************************************************************************** */

// Another Idea 

// const { contract } = require("../contract/contract");

// const dateclashCheck = async (taskData) => {
//   const tasks = await contract.methods.allTask().call();
//   const foundTask = tasks.find((task) => task.completiondate === taskData);

//   if (foundTask) {
//     return foundTask.name;
//   }
//   return "No Task Found";
// };

// const priorityCheck = async (id) => {
//   const tasks = await contract.methods.allTask().call();
//   const result = tasks[id - 1].name.includes("priority");
//   return result;
// };

// const chagetaskdeadline = async (taskid, newdeadline, extendeddeadlineunit) => {
//   const tasks = await contract.methods.allTask().call();
//   const task = tasks.find((task) => task.id === taskid);
//   if (task) {
//     if (extendeddeadlineunit == "seconds")
//     {
//       task.deadline = task.deadline+newdeadline;
//     }
//     else if (extendeddeadlineunit == "minutes")
//     {
//       task.deadline = task.deadline+(newdeadline*60);
//     }
//     else if (extendeddeadlineunit == "hours")
//     {
//       task.deadline = task.deadline+(newdeadline*3600);
//     }
//     else if (extendeddeadlineunit == "days")
//     {
//       task.deadline = task.deadline+(newdeadline*86400);
//     }
//     return "Task deadline changed";
//   }
//   return "Task not found";
// };

// module.exports = { dateclashCheck, priorityCheck, chagetaskdeadline };
