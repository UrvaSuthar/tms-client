import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { ENDPOINT, createAPIEndPoint } from "../api";
import { useTaskContext } from "../hooks/TaskContext";


function TaskCard({ id, title, taskDescription, isActive }) {
  const [isEditable, setIsEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(taskDescription);
  const [editedIsActive, setEditedIsActive] = useState(isActive);

  const { tasks, updateTasks } = useTaskContext(); // Use the context

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveChanges = () => {
    // Send PUT request to update the task
    sendPutRequest(id, editedTitle, editedDescription, editedIsActive);

    setIsEditable(false);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setEditedTitle(title);
    setEditedDescription(taskDescription);
    setEditedIsActive(isActive);
  };
  const handleDelete = () => {
    sendDeleteRequest(id);
  };
  const sendDeleteRequest = async (id) => {
    try {
      await createAPIEndPoint(ENDPOINT.tasks).delete(id);
      console.log("Task deleted successfully");
      updateTasks();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const sendPutRequest = async (id, title, description, isActive) => {
    try {
      const response = await createAPIEndPoint(ENDPOINT.tasks).put(id, {
        title,
        description,
        isActive,
        createdAt: new Date()
      });

      if (response.status === 200) {
        console.log("Task updated successfully");
        updateTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="group max-h-48 relative rounded-md inline-block text-sm font-medium text-gray-800 focus:outline-none focus:ring ring-gray-200 active:text-gray-500">
      <span className="absolute h-full rounded-md inset-0 border-2 border-dashed border-gray-700"></span>
      <span className="block h-48  border-2 font-mono rounded-md border-solid border-gray-700 bg-white p-4 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 ">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-bold">#Task {id}</h2>
          {!isEditable && (
            <button onClick={handleEditClick}>
              <PencilIcon size={10} className="h-5" />
            </button>
          )}
        </div>
        {!isEditable ? (
          <div className="flex h-full flex-col justify-between pb-6">
            <div>
              <p className="text-lg font-medium">{editedTitle}</p>
              <p
                className={`overflow-auto ${
                  editedDescription.length >= 3 ? "max-h-20" : ""
                }`}
              >
                {editedDescription}
              </p>
            </div>
            {editedIsActive ? (
              <div className="flex items-center space-x-2">
                <div className="animate-ping rounded-full bg-gray-900 opacity-75 w-1 h-1"></div>
                <div>Active</div>
              </div>
            ) : (
              <div className="flex justify-between items-end">
                <p>Inactive</p>
                <button onClick={handleDelete}>
                  <TrashIcon size={10} className="h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border-b-2  w-full border-gray-800 mb-2 focus:outline-none"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border-b-2 w-full border-gray-700 focus:outline-none "
            ></textarea>
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                checked={editedIsActive}
                onChange={(e) => setEditedIsActive(e.target.checked)}
                className="mr-2"
              />
              <label>Active</label>
            </div>
          </>
        )}
        {isEditable && (
          <div className="mt-1">
            <button
              onClick={handleSaveChanges}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-1.5 px-2.5 rounded-md mr-2"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-white text-gray-700 font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </span>
    </div>
  );
}

export default TaskCard;