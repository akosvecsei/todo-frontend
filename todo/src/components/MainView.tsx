import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import TaskListView from "./TaskListView";
import { Task } from "../models/taskModel";
import { useTasks } from "../hooks/tasks";

function MainView() {
  const { tasks, isLoading } = useTasks();
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    if (!isLoading) {
      setTaskList(tasks);
    }
  }, [tasks, isLoading]);

  const handleTaskCreated = (newTask: Task) => {
    setTaskList((prev: Task[]) => [newTask, ...prev]);
  };

  return (
    <div className="h-screen w-full bg-white">
      <Navbar onTaskCreated={ handleTaskCreated }/>
      <TaskListView tasks={taskList} />
    </div>
  );
}

export default MainView;
