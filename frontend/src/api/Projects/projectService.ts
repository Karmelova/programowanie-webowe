import api from '../../config/api';
import { Project } from '../../types/project';

const PROJECTS_API_URL = '/projects';

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get(PROJECTS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; 
  }
};

export const createProject = async (project: Project): Promise<Project> => {
  try {
    const response = await api.post(PROJECTS_API_URL, project);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error; 
  }
};

export const deleteProject = async (uuid: string): Promise<void> => {
  try {
    await api.delete(`${PROJECTS_API_URL}/${uuid}`);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const updateProject = async (uuid: string, project: Project): Promise<Project> => {
  try {
    const response = await api.put(`${PROJECTS_API_URL}/${uuid}`, project);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};
