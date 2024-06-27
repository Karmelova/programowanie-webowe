import { Request, Response } from "express";
import Project, { IProject } from "../models/Project";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User";


export const getProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const projects = await Project.find();
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching projects", error });
  }
};

export const getProjectById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.json(project);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching project", error });
  }
};

export const getUserActiveProject = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).populate('activeProject');

    if (!user || !user.activeProject) {
      return res.status(404).json({ message: 'No active project found' });
    }

    return res.json(user.activeProject);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting user active project', error });
  }
};

export const setUserActiveProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { projectUuid } = req.params;
    const project = await Project.findOne({uuid: projectUuid});
    console.log('pr'+projectUuid)

    if(projectUuid=='not-set'){
      const user = await User.findOneAndUpdate(
        { uuid: req.user?.uuid },
        { activeProject: '' },
        { new: true }
      );
      return res.json(user);
    }
    else if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    else{
      
    }
    const user = await User.findOneAndUpdate(
      { uuid: req.user?.uuid },
      { activeProject: projectUuid },
      { new: true }
    );

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error setting user active project', error });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({
      uuid: uuidv4(),
      name,
      description,
    });
    const savedProject = await newProject.save();
    return res.status(201).json(savedProject);
  } catch (error) {
    return res.status(500).json({ message: "Error creating project", error });
  }
};

export const updateProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { uuid } = req.params;
    const { name, description } = req.body;
    const updatedProject = await Project.findOneAndUpdate(
      { uuid },
      { name, description },
      { new: true }
    );
    return res.json(updatedProject);
  } catch (error) {
    return res.status(500).json({ message: "Error updating project", error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    await Project.deleteOne({ uuid });
    res.status(204).json({ message: "Project deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting project", error });
  }
};
