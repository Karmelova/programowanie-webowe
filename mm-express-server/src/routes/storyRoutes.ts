import { Router } from 'express';
import * as storyController from '../controllers/storyController';

const router = Router();

router.get('/stories', storyController.getStories);
router.get('/stories/:id', storyController.getStoryById);
router.post('/stories', storyController.createStory);
router.put('/stories/:id', storyController.updateStory);
router.delete('/stories/:id', storyController.deleteStory);

export default router;
