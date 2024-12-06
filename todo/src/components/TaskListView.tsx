import React, { useState, useEffect } from "react";
import TaskView from "./TaskView";
import { Task } from "../models/taskModel";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useUpdateTaskOrder } from "../hooks/tasks";

interface TaskListViewProps {
  tasks: Task[];
}

function TaskListView({ tasks }: TaskListViewProps) {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const { updateTaskOrder } = useUpdateTaskOrder();

  useEffect(() => {
    if (tasks) {
      setTaskList(tasks);
    }
  }, [tasks]);

  const handleDelete = (id: number) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const handleDragEnd = async (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index) return;

    const updatedTasks = Array.from(taskList);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    setTaskList(updatedTasks);

    const orderedTasks = updatedTasks.map((task, index) => ({
      id: task.id,
      order: index + 1,
    }));

    if (!Array.isArray(orderedTasks)) {
      console.error("Invalid task order data");
      return;
    }

    try {
      await updateTaskOrder(orderedTasks);
    } catch (error) {
      console.error("Failed to update task order:", error);
    }
  };

  return (
    <div className="px-20 h-[calc(100vh-150px)] pb-10">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-4 overflow-y-auto h-full p-5 scrollbar-thin
              scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-darkThumb
              dark:scrollbar-track-darkScrollbar shadow-inner dark:shadow-black shadow-slate-400 rounded-3xl"
            >
              {taskList.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskView task={task} onDelete={handleDelete} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TaskListView;