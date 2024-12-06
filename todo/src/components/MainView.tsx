import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import NewTaskModal from "./NewTaskModal";
import TaskListView from "./TaskListView";
import { Task } from "../models/taskModel";
import { useTasks } from "../hooks/tasks";

function MainView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, loading } = useTasks();
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  useEffect(() => {
    if (!loading) {
      setTaskList(tasks);
    }
  }, [tasks, loading]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTaskCreated = (newTask: Task) => {
    setTaskList((prev) => [newTask, ...prev]);
  };

  return (
    <div className="h-screen w-full min-w-[570px] bg-white dark:bg-[#212121]">
      <Navbar onOpenModal={openModal} />
      <TaskListView tasks={taskList} />

      {isModalOpen && (
        <NewTaskModal onClose={closeModal} onTaskCreated={handleTaskCreated} />
      )}
    </div>
  );
}

export default MainView;
