import React, { createContext, useContext, useState, useEffect } from "react";
import { createAPIEndPoint, ENDPOINT } from "../api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); // New state for users
  const [isAdmin, setIsAdmin] = useState(false); // Add state to track admin status


  const updateTasks = async () => {
    // Fetch tasks from the API and update the context
    try {
      const response = await createAPIEndPoint(ENDPOINT.tasks).fetchAll();
      const usersResponse = await createAPIEndPoint().getUsers();

      const currentUser = JSON.parse(localStorage.getItem("user"));
      
      setIsAdmin(currentUser.userName.toLowerCase() === "admin");
      setUsers(usersResponse.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    <TaskContext.Provider value={{ tasks, isAdmin, users, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
