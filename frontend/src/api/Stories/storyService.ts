import axios, { AxiosError } from 'axios';
import api from '../../config/api';
import { Story } from '../../types/story';

const STORIES_API_URL = '/stories';

export const getStories = async (): Promise<Story[]> => {
  try {
    const response = await api.get(STORIES_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};
export const getStoryById = async (uuid: string): Promise<Story> => {
  try {
    console.log(uuid)
    const response = await api.get(`${STORIES_API_URL}/${uuid}`);
    console.log(response)
    return response.data as Story;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Server responded with a non-success status code
        console.error('Request failed with status:', axiosError.response.status);
        console.error('Response data:', axiosError.response.data);
      } else if (axiosError.request) {
        // Request made but no response received
        console.error('No response received:', axiosError.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error setting up the request:', axiosError.message);
      }
    } else {
      // Network error or other unexpected errors
      console.error('Error fetching story by id:', error);
    }
    throw error;
  }
};

export const createStory = async (story: Story): Promise<Story> => {
  try {
    console.log(story);
    const response = await api.post(STORIES_API_URL, story);
    return response.data;
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
};

export const deleteStory = async (uuid: string): Promise<void> => {
  try {
    await api.delete(`${STORIES_API_URL}/${uuid}`);
  } catch (error) {
    console.error('Error deleting story:', error);
    throw error;
  }
};

export const updateStory = async (
  uuid: string,
  story: Story,
): Promise<Story> => {
  try {
    const response = await api.put(`${STORIES_API_URL}/${uuid}`, story);
    return response.data;
  } catch (error) {
    console.error('Error updating story:', error);
    throw error;
  }
};
