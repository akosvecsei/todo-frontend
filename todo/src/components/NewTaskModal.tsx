import React, { useState } from "react";
import { useCreateTask } from "../hooks/tasks";
import { Task } from "../models/taskModel";

interface NewTaskModalProps {
  onClose: () => void;
  onTaskCreated: (newTask: Task) => void;
}

function NewTaskModal({ onClose, onTaskCreated }: NewTaskModalProps) {
  const [taskName, setTaskName] = useState("");
  const { createTask } = useCreateTask();

  const handleSave = async () => {
    if (!taskName.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    const newTask = await createTask(taskName);
    if (newTask) {
      onTaskCreated(newTask);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="absolute top-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-[450px] h-[230px] rounded-2xl shadow-lg bg-white dark:bg-[#212121] p-5 flex flex-col items-center">
        <p className="w-full text-3xl font-[500] text-black dark:text-white">
          New Task
        </p>

        <input
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-[60px] w-full bg-gray-300 dark:bg-[#414141] rounded-lg text-black dark:text-white text-xl mb-4 px-5 font-[300] focus:outline-none focus:border-none mt-5"
          placeholder="Name..."
        />

        <div className="w-full flex items-center justify-between">
          <div
            className="w-[50px] h-[50px] rounded-full bg-red-600 flex items-center justify-center mt-5 cursor-pointer"
            onClick={onClose}
          >
            <svg
              width="26"
              height="26"
              fill="#ffffff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m13.59 12.002 4.454-4.453a1.126 1.126 0 0 0-1.59-1.594L12 10.408 7.547 5.955A1.127 1.127 0 1 0 5.953 7.55l4.453 4.453-4.453 4.453a1.127 1.127 0 1 0 1.594 1.594L12 13.596l4.453 4.453a1.127 1.127 0 1 0 1.594-1.594l-4.456-4.453Z"></path>
            </svg>
          </div>

          <div
            className="w-[100px] h-[50px] rounded-full bg-gray-300 dark:bg-[#535353] flex items-center justify-center mt-5 cursor-pointer"
            onClick={handleSave}
          >
            <p className="text-xl">🚀</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTaskModal;
