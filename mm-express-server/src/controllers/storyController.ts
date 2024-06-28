import { Request, Response } from 'express';
import Story from '../models/Story';


export const getStories = async (req: Request, res: Response) => {
  try {
    const {projectUuid} = req.params
    const stories = await Story.find({ projectUuid: projectUuid });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error });
  }
};

export const getStoryById = async (req: Request, res: Response) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching story', error });
  }
};


export const createStory = async (req: Request, res: Response) => {
  try {
    const { uuid, name, description, priority, projectUuid, creationDate, status, owner } = req.body;
    const newStory = new Story({
      uuid,
      name,
      description,
      priority,
      projectUuid,
      creationDate,
      status,
      owner,
    });
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating story', error });
  }
};


export const updateStory = async (req: Request, res: Response) => {
  try {
    const { name, description, priority, projectUuid, creationDate, status, owner } = req.body;
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      { name, description, priority, projectUuid, creationDate, status, owner },
      { new: true }
    );
    if (!updatedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating story', error });
  }
};


export const deleteStory = async (req: Request, res: Response) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.id);
    if (!deletedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.status(204).json({ message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting story', error });
  }
};
