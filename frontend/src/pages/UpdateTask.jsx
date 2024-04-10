import { useState } from "react";
import Navigation from "../components/Navigation";

const UpdateTask = ({ state }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  //Destrcuturing the state object to get the contract and account values
  const { contract, account } = state;
  const updateTask = async (event) => {
    event.preventDefault();
    const taskName = document.querySelector("#taskName").value;
    const taskDescription = document.querySelector("#taskDescription").value;
    const taskDate = document.querySelector("#taskDate").value;
    const taskID = document.querySelector("#taskID").value;
    const taskPriority = document.querySelector("#taskPriority").value;

    try {
      //We are making this request to the server only to check whether there is a date clash (the value of the date after updation should not clash with an already existing date) or not for the given task to be updated.
      const res = await fetch(
        "http://localhost:3000/api/ethereum/update-task",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ taskDate: taskDate }),
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        //Updting the task in the smart contract
        await contract.methods
          .updateTask(taskID, taskName, taskDescription, taskDate, taskPriority)
          .send({ from: account });
        setModalContent(
          `Task ID ${taskID} updated with task name ${taskName} and date ${taskDate}`
        );
        setModalVisible(true);
      } else {
        throw new Error("Task cannot be updated because of date clash");
      }
    } catch (error) {
      setModalContent("Task cannot be updated");
      setModalVisible(true);
    }
  };
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="update_task todo_btn">
          <form onSubmit={updateTask}>
            <label>
              ID:
              <input id="taskID" placeholder="Enter the ID of the task to be edited."/>
            </label>
            <label>
              Name:
              <input id="taskName" placeholder="Enter the name of the task."/>
            </label>
            <label>
              Description:
              <input id="taskDescription" placeholder="Enter the description of the task." />
            </label>
            <label>
              Date:
              <input id="taskDate" type="date" />
            </label>
            <label>
              Priority:
              <input id="taskPriority" placeholder="Enter true/false (Case Specific)."/>
            </label>
            <button type="submit">Update Task</button>
          </form>

          {modalVisible && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <p>{modalContent}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default UpdateTask;

// Another Way 

// import { useState } from "react";
// import Navigation from "../components/Navigation";
// const UpdateTask = ({ state }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState("");

//   const closeModal = () => {
//     setModalVisible(false);
//     setModalContent("");
//   };

//   const { contract, account } = state;
//   const updateTask = async (event) => {
//     event.preventDefault();
//     const taskName = document.querySelector("#taskName").value;
//     const taskID = document.querySelector("#taskID").value;
//     const description = document.querySelector("#description").value;
//     const deadline = document.querySelector("#deadline").value;
//     const deadlineunit = document.querySelector("#deadlineunit").value;
//     const completiondate = document.querySelector("#completiondate").value;

//     try {
//       const res = await fetch(
//         "http://localhost:3000/api/ethereum/update-task",
//         {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify({ taskDate: taskDate }),
//         }
//       );
//       const data = await res.json();
//       if (data.status === 200) {
//         await contract.methods
//           .updateTask(
//             taskID,
//             taskName,
//             description,
//             deadline,
//             deadlineunit,
//             completiondate
//           )
//           .send({ from: account });
//         setModalContent(
//           `Task ID ${taskID} updated with task name ${taskName} and date ${completiondate}`
//         );
//         setModalVisible(true);
//       } else {
//         throw new Error("Task cannot be updated because of date clash");
//       }
//     } catch (error) {
//       setModalContent("Task cannot be updated");
//       setModalVisible(true);
//     }
//   };
//   return (
//     <>
//       <Navigation />
//       <div className="update_task todo_btn">
//         <form onSubmit={updateTask}>
//           <label>
//             Name:
//             <input
//               id="taskName"
//               type="string"
//               placeholder="Enter the name of the task"
//             />
//           </label>
//           <label>
//             Description of the Task:
//             <input
//               id="description"
//               type="date"
//               placeholder="Enter the description about the task"
//             />
//           </label>
//           <label>
//             Deadline of the Task:
//             <input
//               id="deadline"
//               type="int"
//               placeholder="Enter the deadline of the task"
//             />
//           </label>
//           <label>
//             Unit of Deadline of the Task:
//             <input
//               id="deadlineunit"
//               type="string"
//               placeholder="Enter the unit of deadline of task (seconds/minutes/hours/days)"
//             />
//           </label>
//           <label>
//             Date of Completion for the Task:
//             <input
//               id="completiondate"
//               type="date"
//               placeholder="Enter the date of completion of the task"
//             />
//           </label>
//           <button type="submit">Update Deadline</button>
//         </form>

//         {modalVisible && (
//           <div className="modal">
//             <div className="modal-content">
//               <span className="close" onClick={closeModal}>
//                 &times;
//               </span>
//               <p>{modalContent}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
// export default UpdateTask;

