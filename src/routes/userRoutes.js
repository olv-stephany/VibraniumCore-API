import express from 'express';
import * as userController from "../controllers/userController.js"
import { authToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authToken, userController.list);
router.get('/:id', authToken, userController.searchById);
router.put('/:id', authToken, userController.update);
router.delete('/:id', authToken, userController.deleteUser);

export default router;