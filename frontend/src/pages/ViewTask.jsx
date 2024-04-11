import { useState } from "react";
import Navigation from "../components/Navigation";
const ViewTask = () => {
  const [task, setTask] = useState({
    numId: null,
    name: null,
    description: null,
    date: null,
    isPriority: null,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [modalContent, setModalContent] = useState("");

  const viewTask = async (event) => {
    try {
      //Preventing reload of the browser upon running this function.
      event.preventDefault();
      const taskID = document.querySelector("#taskID").value;
      const res = await fetch(
        `https://mentor-dash.onrender.com/api/ethereum/view-task/${taskID}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      // console.log(data);
      if (data.status === 200) {
        // console.log(data.taskObj);
        setTask(data.taskObj);
      } else {
        throw new Error();
      }
    } catch (error) {
      setModalContent("Task does not exist");
      setModalVisible(true);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="view_task todo_btn">
          <form onSubmit={viewTask}>
            <label>
              ID:
              <input id="taskID" />
            </label>
            <button type="submit">View Task</button>
          </form>
          {task.numId !== null &&
          task.name !== null &&
          task.description !== null &&
          task.date !== null &&
          task.isPriority != null ? (
            <div className="view_task_by_id  view_all_tasks_card">
              <p>Task ID: {task.numId}</p>
              <p>Task Name: {task.name}</p>
              <p>Task Description: {task.description}</p>
              <p>Task Date: {task.date}</p>
              <p>Task Priority: {task.isPriority? "High" : "Low"}</p>
            </div>
          ) : (
            <div className="empty_div"></div>
          )}

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
export default ViewTask;

/*********************************************************************************** */

// Another Way 

// import {useState} from "react";
// import Navigation from "../components/Navigation";
// const ViewTask =()=>{
//     const [task,setTask]=useState({numId:null,name:null,date:null});
//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalContent, setModalContent] = useState("");
//     const viewTask =async(event)=>{
//        try{
//           event.preventDefault()
//           const taskID = document.querySelector("#taskID").value;
//           const res = await fetch(`http://localhost:3000/api/ethereum/view-task/${taskID}`,
//           {
//             method:"GET",
//             headers:{
//                 "contetnt-type":"application/json"
//             }
//           });
//           const data = await res.json();
//           if(data.status===200){
//             console.log(data.taskObj)
//             setTask(data.taskObj)
//           }else{
//             throw new Error;
//           }
//        }catch(error){
//         setModalContent("Task does not exist");
//         setModalVisible(true);
//        }
//     }
//     const closeModal = () => {
//       setModalVisible(false);
//       setModalContent("");
//     };
//     return<>
//      <Navigation/>
//      <div className="view_task todo_btn">
//      {task.numId!==null && task.name!==null && task.date!==null ? (
//           <div className="view_task_by_id  view_all_tasks_card">
//             <p>Task ID: {task.numId}</p>
//             <p>Task Name: {task.name}</p>
//             <p>Task Description: {task.description}</p>
//             <p>Task Deadline: {task.deadline}</p>
//             <p>Task Deadline Unit: {task.deadlineunit}</p>
//             <p>Task Completion Date: {task.completiondate}</p>
//           </div>
//         ) : (
//           <div className="empty_div"></div>
//         )}
//         <form onSubmit={viewTask}>
//           <label>
//             ID:
//             <input id="taskID" />
//           </label>
//           <button type="submit">View Task</button>
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
//         </div>

//     </>
// }
// export default ViewTask;