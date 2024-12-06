import { useState, useEffect } from 'react';
import { Task } from '../models/taskModel';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data: Task[] = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  return { tasks, loading, error };
};

export const useToggleTask = () => {
    const [error, setError] = useState<string | null>(null);
  
    const toggleTaskCompletion = async (id: number) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task/${id}/toggle`, {
          method: 'PATCH',
        });
  
        if (!response.ok) {
          throw new Error('Failed to toggle task completion');
        }
  
        const updatedTask: Task = await response.json();
        return updatedTask;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        return null;
      }
    };
  
    return { toggleTaskCompletion, error };
};

export const useDeleteTask = () => {
    const [error, setError] = useState<string | null>(null);
  
    const deleteTask = async (id: number) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
  
        const result = await response.json();
        return result;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        return null;
      }
    };
  
    return { deleteTask, error };
};

export const useCreateTask = () => {
    const [error, setError] = useState<string | null>(null);
  
    const createTask = async (name: string): Promise<Task | null> => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task`, {
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
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        return null;
      }
    };
  
    return { createTask, error };
};

export const useUpdateTaskOrder = () => {
  const [error, setError] = useState<string | null>(null);

  const updateTaskOrder = async (orderedTasks: { id: number; order: number }[]): Promise<void> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderedTasks }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task order');
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { updateTaskOrder, error };
};