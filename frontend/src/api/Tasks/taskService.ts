import api from '../../config/api';
import { Task } from '../../types/tasks';

const TASKS_API_URL = '/tasks';

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get(TASKS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTaskById = async (uuid: string): Promise<Task> => {
  try {
    const response = await api.get(`${TASKS_API_URL}/${uuid}`);
    return response.data as Task;
  } catch (error) {
      console.error('Error fetching task by id:', error);
      throw error;
  }
};

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await api.post(TASKS_API_URL, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const deleteTask = async (uuid: string): Promise<void> => {
  try {
    await api.delete(`${TASKS_API_URL}/${uuid}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};


export const updateTask = async (
  uuid: string,
  task: Task,
): Promise<Task> => {
  try {
    console.log(uuid)
    console.log(task)

    const response = await api.put(`${TASKS_API_URL}/${uuid}`, task);
    return response.data as Task;
  } catch (error) {
    console.error('Error updating story:', error);
    throw error;
  }
};
