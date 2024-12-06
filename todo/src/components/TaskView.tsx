import React, { useState } from "react";
import { Task as TaskType } from "../models/taskModel";
import { useToggleTask, useDeleteTask } from "../hooks/tasks";

interface TaskProps {
  task: TaskType;
  onDelete: (id: number) => void;
}

const TaskView: React.FC<TaskProps> = ({ task, onDelete }) => {
  const { deleteTask } = useDeleteTask();
  const { toggleTaskCompletion } = useToggleTask();
  const [taskState, setTaskState] = useState<TaskType>(task);

  const handleToggle = async () => {
    const updatedTask = await toggleTaskCompletion(taskState.id);
    if (updatedTask) {
      setTaskState(updatedTask);
    }
  };

  const handleDelete = async () => {
    const result = await deleteTask(taskState.id);
    if (result) {
      onDelete(taskState.id);
    }
  };

  return (
    <div className="min-w-[240px] bg-gray-300 dark:bg-[#535353] text-black dark:text-white rounded-xl flex items-center justify-between p-3">
      <div className="flex items-center justify-start gap-5">
        <div
          className="bg-transparent border-[1px] border-gray-500 dark:border-white border-solid h-[30px] w-[30px] rounded-lg flex justify-center items-center cursor-pointer"
          onClick={handleToggle}
        >
          {taskState.iscompleted && (
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#00aa00"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.5 6 9 18l-4.5-4.5"></path>
            </svg>
          )}
        </div>
        <p className="text-xl truncate select-none">{taskState.name}</p>
      </div>
      <div className="cursor-pointer" onClick={handleDelete}>
        <svg
          width="20"
          height="20"
          fill="#aaaaaa"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.25 4.5h-4.5V3.375A1.875 1.875 0 0 0 13.875 1.5h-3.75A1.875 1.875 0 0 0 8.25 3.375V4.5h-4.5a.75.75 0 0 0 0 1.5h.797l.89 14.293c.067 1.259 1.032 2.207 2.25 2.207h8.625c1.225 0 2.17-.927 2.25-2.203L19.453 6h.797a.75.75 0 1 0 0-1.5Zm-11.223 15H9a.75.75 0 0 1-.75-.723l-.375-10.5a.75.75 0 0 1 1.5-.054l.375 10.5a.75.75 0 0 1-.723.777Zm3.723-.75a.75.75 0 1 1-1.5 0V8.25a.75.75 0 1 1 1.5 0v10.5Zm1.5-14.25h-4.5V3.375A.37.37 0 0 1 10.125 3h3.75a.371.371 0 0 1 .375.375V4.5Zm1.5 14.277a.75.75 0 0 1-.75.723h-.027a.75.75 0 0 1-.723-.777l.375-10.5a.75.75 0 0 1 1.5.054l-.375 10.5Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default TaskView;
