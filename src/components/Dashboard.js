import React, { useEffect, useState } from "react";
import { createAPIEndPoint, ENDPOINT } from "../api";
import { useTaskContext } from "../hooks/TaskContext";


const Dashboard = () => {

  const { tasks, updateTasks } = useTaskContext(); // Use the context

  return (
    <div className="flex h-screen flex-col font-mono bg-dotted-spacing-8 bg-dotted-gray-300 justify-start items-start">
      <div className="flex h-20 justify-between items-center w-full">
        <p className="ml-4 text-gray-700 text-4xl ">Tasks Dashboard</p>
        <button className="mr-5 items-center p-2 text-white rounded bg-gray-700" onClick={updateTasks}>
          Refetch Tasks
        </button>
      </div>
      <div className="w-full flex justify-center items-center">
        {/* <div className="overflow-x-auto w-full"> */}
        <table className="w-full mx-4 overflow-auto bg-white  mt-5">
          <thead>
            <tr className="border-b-2 border-gray-700 text-lg">
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="text-center">
                <td>
                  <p>{task.title}</p>
                </td>
                <td>
                  <p>{task.description}</p>
                </td>
                <td>
                  <p>{task.isActive ? "Active" : "Inactive"}</p>
                </td>
                <td>
                <p>{new Date(task.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
