import React, { createContext, useContext, useState, useEffect } from "react";
import { createAPIEndPoint, ENDPOINT } from "../api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const updateTasks = async () => {
    // Fetch tasks from the API and update the context
    try {
      const response = await createAPIEndPoint(ENDPOINT.tasks).fetch();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  // useEffect(()=>{
  //   if(localStorage.getItem('isUpdated') == "true"){
  //     updateTasks();
  //     localStorage.setItem('isUpdated',"false");
  //   }
  // })
  useEffect(() => {
	updateTasks();
      });

  return (
    <TaskContext.Provider value={{ tasks, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
