import express from 'express'
import * as movementController from '../controllers/movementController.js'
import { authToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authToken, movementController.create);
router.get('/', authToken, movementController.list);
router.get('/:id', authToken, movementController.searchById);
router.put('/:id', authToken, movementController.update);

export default router;