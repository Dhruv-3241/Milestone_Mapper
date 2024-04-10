// import { useState } from "react";
// import Navigation from "../components/Navigation";

// const SetTimer = ({ state }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState("");

//   const closeModal = () => {
//     setModalVisible(false);
//     setModalContent("");
//   };

//   const { contract, account } = state;

//   const setTimer = async (event) => {
//     event.preventDefault();
//     const taskID = document.querySelector("#taskID").value;
//     const newDeadline = document.querySelector("#newDeadline").value;
//     const extendedDeadlineunit = document.querySelector(
//       "#extendedDeadlineunit"
//     ).value;

//     try {
//       const res = await fetch("http://localhost:3000/api/ethereum/settimer", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({ taskDate: taskDate }),
//       });
//       const data = await res.json();
//       if (data.status === 200) {
//         await contract.methods
//           .setTimer(taskID, newDeadline, extendedDeadlineunit)
//           .send({ from: account });
//         setModalContent(
//           `Task ID ${taskID} updated with an increment in deadline by ${newDeadline} ,so new deadline is  ${extendedDeadlineunit}`
//         );
//         setModalVisible(true);
//       } else {
//         throw new Error(
//           "Task Deadline cannot be updated because of missing values"
//         );
//       }
//     } catch (error) {
//       setModalContent("Task Deadline cannot be updated");
//       setModalVisible(true);
//     }
//   };
//   return (
//     <>
//       <Navigation />
//       <div className="settimer_task todo_btn">
//         <form onSubmit={setTimer}>
//           <label>
//             ID:
//             <input id="taskID" />
//           </label>
//           <label>
//             Increment in Deadline:
//             <input id="Increment in Time" />
//           </label>
//           <label>
//             Increment in Deadline Unit:
//             <input
//               id="Deadline Unit (seconds/ minutes/ hours/ days)"
//               type="string"
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
// export default SetTimer;
