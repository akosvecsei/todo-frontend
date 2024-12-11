import { useState } from "react";
import { useCreateTask } from "../hooks/tasks";
import { Task } from "../models/taskModel";

interface NavbarProps {
    onTaskCreated: (newTask: Task) => void;
  }

function Navbar({ onTaskCreated }: NavbarProps) {

    const [taskName, setTaskName] = useState("");
    const { createTask } = useCreateTask();

    const handleSave = async () => {
        if (!taskName.trim()) {
            alert("Please enter a task name.")
            return;
        }

        const newTask = await createTask(taskName);
        if (newTask) {
            setTaskName("");
            onTaskCreated(newTask);
        }
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

  return (
    <div className="w-full h-[200px] px-20 flex flex-col pt-5 justify-center gap-5">
        <div className="flex flex-row w-full items-center justify-between">
            <p className="text-6xl font-bold select-none text-black">
                Tasks
            </p>

            <div className="flex flex-row w-[200px] justify-end gap-5">
                <div
                className="h-[60px] w-[60px] bg-gray-300 rounded-md flex justify-center items-center cursor-pointer"
                onClick={handleSave}
                >
                    <p className="text-2xl">🚀</p>
                </div>
            </div>
        </div>

        <div className="w-full h-[50px] flex flex-row justify-start items-center">
            <p className="font-semibold text-gray-600 min-w-[90px] text-lg">New Task:</p>
            <input
                type="text"
                onChange={(e) => setTaskName(e.target.value)}
                value={taskName}
                onKeyDown={handleKeyDown}
                className="h-full w-full rounded-lg px-1 text-black text-lg font-[semibold focus:outline-none focus:border-none"
                />
        </div>
    </div>
  );
}

export default Navbar;
