import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getUserActiveProject,
  setUserActiveProject,
} from '../controllers/projectController';

const router = Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', createProject);
router.put('/projects/:uuid', updateProject);
router.delete('/projects/:uuid', deleteProject);
router.get('/projects/user/active-project', authMiddleware, getUserActiveProject);
router.post('/projects/user/active-project/:projectUuid', authMiddleware, setUserActiveProject);

export default router;
