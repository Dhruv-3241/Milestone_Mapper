import { useState } from "react";
import Navigation from "../components/Navigation";

const CreateTask = ({ state }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    setModalOpen(false);
    setModalContent("");
  };

  const createTask = async (event) => {
    event.preventDefault();
    //fetching contract and account values stored inside the state variable
    const { contract, account } = state;

    // console.log("Contract is: ", contract);
    //Fetching the value enetered by the user in the form created at the end of this function where the name of Name variable is "taskName"
    const taskName = document.querySelector("#taskName").value;
    const taskDescription = document.querySelector("#taskDescription").value;
    const taskDate = document.querySelector("#taskDate").value;
    const taskPriority = document.querySelector("#taskPriority").value;
    try {
      //Although the server cannot be used to create a task in smart contract still we are pinging the server as we have performed a particular functionality ,i.e. checking no two tasks clash on the same date, so we are pinging the server to check if the task can be added or not.
      //Keep in mind that this checking can be done through the smart contract itself its just that we do not want to spend gas on this.
      //We must keep in mind that since we performing such checking on the server end thats why we are pinging the server otherwise the task can be added directly through the smart contract without pinging the server.
      const res = await fetch(
        "https://milestone-mapper.onrender.com/api/ethereum/create-task",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          //Since we are checking the clash of the dates only on the server side so we need not send all the  data received from the smart contract and send only the necessary/essential data i.e. taskDate.
          body: JSON.stringify({ taskDate: taskDate }),
        }
      );
      console.log("Account is " + account);
      //Here the data variable contains only the response of the server suggesting whether there is a clash in dates or not.
      const data = await res.json();
      if (data.status === 200) {
        if (contract && contract.methods) {
          await contract.methods
            .createTask(taskName, taskDescription, taskDate, taskPriority)
            .send({ from: account });
          setModalContent(`Task: " ${taskName} " is added on the date: " ${taskDate} "`);
        }
      } else {
        alert("Task cannot be added");
      }
    } catch (error) {
      setModalContent(`Task already exists at ${taskDate}`);
    } finally {
      setModalOpen(true);
    }
  };
  return (
    <>
      <Navigation />
      <div className="container">
      <div className="create_task todo_btn">
        <form onSubmit={createTask}>
          <label className="label">
            Name:
            <input id="taskName"  placeholder="Enter the Name of the Task."/>
          </label>
          <label className="label">
            Description:
            <input id="taskDescription" type="string" placeholder="Enter the Description of the Task." />
          </label>
          <label className="label">
            Date:
            <input id="taskDate" type="date" placeholder="Enter the date at which Task should be Completed." />
          </label>
          <label className="label">
            Priority:
            <input id="taskPriority" type="string" placeholder="Enter either true/false (Case Sensitive)."/>
          </label>
          <button type="submit">Create Task</button>
        </form>

        {modalOpen && (
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
export default CreateTask;

/********************************************************************************************************** */

// Another Way 

// import { useState } from "react";
// import Navigation from "../components/Navigation";

// const CreateTask = ({ state }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState("");

//   const closeModal = () => {
//     setModalOpen(false);
//     setModalContent("");
//   };

//   const createTask = async (event) => {
//     event.preventDefault();
//     const { contract, account } = state;
//     const taskName = document.querySelector("#taskName").value;
//     const taskdescription = document.querySelector("#taskdescription").value;
//     const taskdeadline = document.querySelector("#taskdeadline").value;
//     const taskdeadlineunit = document.querySelector("#taskdeadlineunit").value;
//     const taskcompletiondate = document.querySelector("#taskcompletiondate").value;
//     console.log(
//       "task Name: " + taskName,
//       "task Description: " + taskdescription,
//       "task Deadline: " + taskdeadline,
//       "task Deadline Unit: " + taskdeadlineunit,
//       "task Completion Date: " + taskcompletiondate
//     );
//     try {
//       const res = await fetch(
//         "http://localhost:5173/api/ethereum/create-task",
//         {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify({ taskName: taskName, taskdescription: taskdescription, taskdeadline : taskdeadline, taskdeadlineunit: taskdeadlineunit, taskcompletiondate: taskcompletiondate }),
//         }
//       );
//       console.log("Account id: " + account);
//       const data = await res.json();
//       if (data.status === 200) {
//         if (contract && contract.methods) {
//           await contract.methods
//             .createTask(
//               taskID,
//               taskName,
//               taskdescription,
//               taskdeadline,
//               taskdeadlineunit,
//               taskcompletiondate
//             )
//             .send({ from: account });
//           setModalContent(`Task ${taskName} added at ${taskcompletiondate}`);
//         }
//       } else {
//         alert("Task cannot be added");
//       }
//     } catch (error) {
//       setModalContent(`Task already exists at ${taskcompletiondate}`);
//     } finally {
//       setModalOpen(true);
//     }
//   };
//   return (
//     <>
//       <Navigation />
//       <div className="create_task todo_btn">
//         <form onSubmit={createTask}>
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
//               id="taskdescription"
//               type="date"
//               placeholder="Enter the description about the task"
//             />
//           </label>
//           <label>
//             Deadline of the Task:
//             <input
//               id="taskdeadline"
//               type="int"
//               placeholder="Enter the deadline of the task"
//             />
//           </label>
//           <label>
//             Unit of Deadline of the Task:
//             <input
//               id="taskdeadlineunit"
//               type="string"
//               placeholder="Enter the unit of deadline of task (seconds/minutes/hours/days)"
//             />
//           </label>
//           <label>
//             Date of Completion for the Task:
//             <input
//               id="taskcompletiondate"
//               type="date"
//               placeholder="Enter the date of completion of the task"
//             />
//           </label>
//           <button type="submit">Create Task</button>
//         </form>

//         {modalOpen && (
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
// export default CreateTask;
