import express from 'express'
import * as investimentController from '../controllers/investimentController.js'
import { authToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authToken, investimentController.create);
router.get('/', authToken, investimentController.list);
router.get('/:id', authToken, investimentController.searchById);
router.put('/:id', authToken, investimentController.update);
router.delete('/:id', authToken, investimentController.deleteInvestment);

export default router;