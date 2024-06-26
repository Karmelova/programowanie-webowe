import axios from 'axios';
import { Project } from '../../types/project';

const API_URL = 'http://localhost:5000/api/projects';

export const getProjects = async (): Promise<Project[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProject = async (project: Project): Promise<Project> => {
  const response = await axios.post(API_URL, project);
  return response.data;
};

export const deleteProject = async (uuid: string): Promise<void> => {
  await axios.delete(`${API_URL}/${uuid}`);
};

export const updateProject = async (uuid: string, project: Project): Promise<Project> => {
  const response = await axios.put(`${API_URL}/${uuid}`, project);
  return response.data;
};
