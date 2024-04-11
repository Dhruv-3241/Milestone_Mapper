import { useState } from "react";
import Navigation from "../components/Navigation";

const DeleteTask = ({ state }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  const deleteTask = async (event) => {
    event.preventDefault();

    //Destrcuturing the state object to get the contract and account values
    const { contract, account } = state;

    const taskID = document.querySelector("#taskID").value;

    try {
      //We are making this request to the server only to check whether the task cane be deleted or not that is the task name consists of the word "priority" or not.
      const res = await fetch(
        `https://milestone-mapper.onrender.com/api/ethereum/delete-task/${taskID}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      // console.log(data);
      // console.log(data.status);
      // console.log(contract);
      if (data.status === 200) {
        //Deleting the task in the smart contract
        console.log("Hi I am here");
        console.log(taskID);
        if (contract && contract.methods) {
          await contract.methods.deleteTask(taskID).send({ from: account });
          setModalContent(`Task ID ${taskID} deleted.`);
          setModalVisible(true);
        } else {
          setModalContent(`Error`);
          setModalVisible(true);
        }
      } else {
        // throw new Error(
        //   "Task cannot be deleted because it is a Priority Task."
        // );
        setModalContent(
          "Task cannot be deleted because it is a Priority Task."
        );
        setModalVisible(true);
      }
    } catch (error) {
      setModalContent("Task cannot be deleted");
      setModalVisible(true);
    }
  };
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="delete_task todo_btn">
          <form onSubmit={deleteTask}>
            <label>
              ID:
              <input id="taskID" />
            </label>
            <button type="submit">Delete Task</button>
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
export default DeleteTask;
