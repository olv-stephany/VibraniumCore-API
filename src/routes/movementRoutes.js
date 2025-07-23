import express from 'express'
import * as movementController from '../controllers/movementController.js'

const router = express.Router();

router.post('/', movementController.create);
router.get('/', movementController.list);
router.get('/:id', movementController.searchById);
router.put('/:id', movementController.update);

export default router;