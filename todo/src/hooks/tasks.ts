import { Task } from '../models/taskModel';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useTasks = () => {
  const fetchTasks = async () => {
    const response = await fetch(`http://localhost:5000/api/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  };

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
  return { tasks, isLoading };
};

export const useToggleTask = () => {
  const { mutateAsync, error } = useMutation<Task | null, Error, number>({
    mutationFn: async (id: number) => {
      const response = await fetch(`http://localhost:5000/api/task/${id}/toggle`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle task completion');
      }

      const updatedTask: Task = await response.json();
      return updatedTask;
    }
  });

  return { toggleTaskCompletion: mutateAsync, error };
};



export const useDeleteTask = () => {
  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const response = await fetch(`http://localhost:5000/api/task/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
    },
  });
};

export const useCreateTask = () => {
  const { mutateAsync, error } = useMutation<Task | null, Error, string>({
    mutationFn: async (name: string) => {
      const response = await fetch('http://localhost:5000/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask: Task = await response.json();
      return newTask;
    },
  });

  return { createTask: mutateAsync, error };
};

export const useUpdateTaskOrder = () => {
  const { mutateAsync, error } = useMutation<void, Error, { orderedTasks: { id: number; order: number }[] }>({
    mutationFn: async ({ orderedTasks }) => {
      if (!Array.isArray(orderedTasks) || orderedTasks.some(task => !task.id || !task.order)) {
        console.error("Invalid task order data");
        throw new Error('Invalid task order data');
      }
  
      const response = await fetch('http://localhost:5000/api/tasks/order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderedTasks }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update task order:', errorData);
        throw new Error(errorData.message || 'Failed to update task order');
      }
    },
  });

  return { updateTaskOrder: mutateAsync, error };
};