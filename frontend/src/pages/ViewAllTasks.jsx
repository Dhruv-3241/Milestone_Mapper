import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Lottie from "lottie-react";
import animation from "../assets/completed-animation.json";
import { useRef } from "react";

const ViewAllTasks = ({ state }) => {
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  const { contract, account } = state;

  const updateTask = async (event, taskId, taskName, taskDate) => {
    event.preventDefault();

    try {
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
        await contract.methods
          .updateTask(taskId, taskName, taskDate)
          .send({ from: account });
        setModalContent(
          `Task ID ${taskId} updated with task name ${taskName} and date ${taskDate}`
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

  const deleteTask = async (event, taskId) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3000/api/ethereum/delete-task/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        await contract.methods.deleteTask(taskId).send({ from: account });
        setModalContent(`Task ID ${taskId} deleted.`);
        setModalVisible(true);
      } else {
        throw new Error(
          "Task cannot be deleted because of the word priority in its name."
        );
      }
    } catch (error) {
      setModalContent("Task cannot be deleted");
      setModalVisible(true);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  useEffect(() => {
    const allTasks = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/ethereum/view-all-tasks",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.status === 200) {
          setTaskList(data.taskList);
        }
        console.log(data.taskList);
      } catch (error) {
        console.error(error);
      }
    };
    allTasks();
  }, []);

  const animationRef = useRef(null);

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="view_all_tasks">
          <div className="tasks-container">
            {taskList.map((task) => {
              const isTaskCompleted = completedTasks.includes(task.taskId);
              return (
                <div
                  className="view_all_tasks_card"
                  key={task.id}
                  style={
                    task.id !== "" &&
                    task.name !== "" &&
                    task.description !== "" &&
                    task.date !== "" &&
                    task.isPriority !== ""
                      ? {}
                      : { display: "none" }
                  }
                >
                  <div
                    className={`box3 ${isTaskCompleted ? "box3-expanded" : ""}`}
                  >
                    <div className="label">
                      {isTaskCompleted && (
                        <Lottie
                          className="lottie"
                          onComplete={() => {
                            animationRef.current?.setDirection(-1);
                            animationRef.current?.play();
                          }}
                          lottieref={animationRef}
                          loop={true}
                          animationData={animation}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`box1 ${
                      isTaskCompleted ? "box1-expanded" : "box1"
                    }`}
                  >
                    <p>Task Id: {task.taskId}</p>
                    <p>Task Name: {task.name}</p>
                    <p>Task Description: {task.description}</p>
                    <p>Task Date: {task.date}</p>
                    <p>Task Priority: {task.isPriority ? "High" : "Low"}</p>
                    <br />
                  </div>
                  <div
                    className={`box2 ${
                      isTaskCompleted ? "box2-expanded" : "box2"
                    }`}
                  >
                    <button
                      className="newbtn"
                      onClick={(event) =>
                        updateTask(event, task.taskId, task.name, task.date)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="newbtn"
                      onClick={(event) => deleteTask(event, task.taskId)}
                    >
                      Delete
                    </button>
                  </div>
                  <div
                    className="box4"
                    onClick={() => toggleTaskCompletion(task.taskId)}
                  >
                    <div className="checkbox-wrapper-11">
                      <input
                        id="02-11 iscompleted"
                        type="checkbox"
                        checked={completedTasks.includes(task.taskId)}
                      />
                      <label htmlFor="02-11">Task Pending</label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
    </>
  );
};
export default ViewAllTasks;
