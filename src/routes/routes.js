import { Router } from 'express';
import { renderHomePage } from '../controllers/IndexController.js';
import { createSong, deleteSong, editSong, getSongs } from '../controllers/SongsController.js';

const router = Router();

router.get('/', renderHomePage);
router.post('/canciones', createSong);
router.get('/canciones', getSongs);
router.put('/canciones/:id', editSong);
router.delete('/canciones/:id', deleteSong);

export default router;
