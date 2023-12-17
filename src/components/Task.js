import React, { useState, useEffect } from "react";
import Header from "./Header";
import TaskCard from "./TaskCard";
import {  createAPIEndPoint, ENDPOINT } from "../api";
import { useTaskContext } from "../hooks/TaskContext";

function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const {updateTasks}= useTaskContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await createAPIEndPoint(ENDPOINT.tasks).fetch();
        // console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);
  const handleButtonClick =()=>{
    setIsModalOpen(!isModalOpen);
  }
  const handleSubmit = async () => {

    setIsModalOpen(!isModalOpen);
    const requestBody = {
      id: 0,
      title: taskName,
      description: taskDescription,
      isActive: true,
      createdAt: new Date(),
    };

    try {
      const response = await(createAPIEndPoint(ENDPOINT.tasks)).post(requestBody)
      console.log(response);
      setTasks([...tasks, response.data]);
      localStorage.removeItem("isUpdated");
      localStorage.setItem("isUpdated", "true");
      updateTasks();
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddButtonClick = () => {
    setIsModalOpen(!isModalOpen);
    // alert("Task Added Successfully!");
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  return (
    <div className="flex font-mono">
      <Header />
      <div className="flex-grow bg-dotted-spacing-9 bg-dotted-gray-400 px-3 py-3">
        <h1 className="text-6xl my-5 text-gray-700">Tasks</h1>
        {/* input button for task that opens a modal to take all the data inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all">
          <button
            className="group h-48 relative rounded-md inline-block text-sm font-medium text-gray-800 focus:outline-none focus:ring ring-gray-200 active:text-gray-500"
            type="button"
            onClick={handleButtonClick}
          >
            <span className="absolute h-full rounded-md inset-0 border-2 border-dashed border-gray-700"></span>
            <span className="block text-3xl h-full font-normal border-2 font-mono rounded-md border-solid border-gray-700 bg-white px-12 py-3 transition-all group-hover:text-5xl group-hover:-translate-x-1 group-hover:-translate-y-1 flex justify-center items-center">
              +
            </span>
          </button>

          {isModalOpen && (
            <div className="modal ">
              {/* Modal content */}
              <div className="modal-content flex-col space-y-2">
                <span className="close text-lg" onClick={handleButtonClick}>
                  &times;
                </span>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <input
                    className="border w-full border-gray-600 p-1 rounded placeholder:text-sm"
                    type="text"
                    value={taskName}
                    onChange={handleTaskNameChange}
                    placeholder="Task Name"
                  />
                  <textarea
                    className="border w-full placeholder:text-sm border-gray-600 p-1 rounded max-h-16"
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                    placeholder="Task Description"
                  ></textarea>

                  <div className="flex flex-row gap-3">
                    <button
                      type="submit"
                      className="group relative flex bg-gray-800 justify-center rounded-md px-4 py-1.5 text-sm text-white hover:bg-gray-700"
                    >
                      Add
                    </button>
                    <button
                      onClick={handleButtonClick}
                      className="border border-dashed border-gray-800 rounded-md px-2 py-1.5 bg-white text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              index={index+1}
              id={task.id}
              title={task.title}
              taskDescription={task.description}
              isActive={task.isActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task;
