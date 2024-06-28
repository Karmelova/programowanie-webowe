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
    const response = await api.get(`${STORIES_API_URL}/${uuid}`);
    console.log(response)
    return response.data as Story;
  } catch (error) {
      console.error('Error fetching story by id:', error);
      throw error;
  }
};

export const createStory = async (story: Story): Promise<Story> => {
  try {
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
    console.log(uuid)
    console.log(story)

    const response = await api.put(`${STORIES_API_URL}/${uuid}`, story);
    return response.data as Story;
  } catch (error) {
    console.error('Error updating story:', error);
    throw error;
  }
};
