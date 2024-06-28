import { Request, Response } from 'express';
import Task from '../models/Task';
import Story from '../models/Story';
import { v4 as uuidv4 } from "uuid";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const activeProjectUuid = req.user?.activeProject; 
    const stories = await Story.find({ projectUuid: activeProjectUuid }).select('uuid')
    const tasks = await Task.find({ storyUuid: { $in: stories.map(story => story.uuid) } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ uuid: id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { uuid, name, description, priority, storyUuid, addDate, status, owner, estimatedTime, startDate, endDate } = req.body;
    const newTask = new Task({
      uuid: uuidv4(),
      name,
      description,
      priority,
      storyUuid,
      addDate,
      status,
      owner,
      estimatedTime,
      startDate,
      endDate,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

export const updateTasky = async (req: Request, res: Response) => {
  try {
    const { name, description, priority, storyUuid, addDate, status, owner, estimatedTime, startDate, endDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { name, description, priority, storyUuid, addDate, status, owner, estimatedTime, startDate, endDate },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const {
      uuid,
      name,
      description,
      priority,
      storyUuid,
      AddDate,
      status,
      owner,
    } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { uuid: req.params.id },
      { name, description, priority, storyUuid, AddDate, status, owner },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating Task", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
