import { Router } from 'express';
import { renderHomePage } from '../controllers/IndexController.js';
import { createSong, deleteSong, editSong, getSongs } from '../controllers/SongsController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(renderHomePage));
router.post('/canciones', asyncHandler(createSong));
router.get('/canciones', asyncHandler(getSongs));
router.put('/canciones/:id', asyncHandler(editSong));
router.delete('/canciones/:id', asyncHandler(deleteSong));

export default router;
