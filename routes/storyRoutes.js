import express from 'express';
import { createStory, editStory, deleteStory, publishStory, likeStory, commentOnStory, getAllStories, getTrendingStories } from '../controllers/storyController.js';
import verifyToken from '../middleware/authMiddleware.js';  
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Author routes
router.post('/create', verifyToken, createStory);
router.put('/edit/:storyId', verifyToken, editStory);
router.delete('/delete/:storyId', verifyToken, deleteStory);
router.post('/publish/:storyId', verifyToken, publishStory);
router.get('/getstories',authMiddleware,getAllStories);
router.get('/trending',getTrendingStories)

// Both Author and Reader routes
router.post('/like/:storyId', verifyToken, likeStory);
router.post('/comment/:storyId', verifyToken, commentOnStory);

export default router;
