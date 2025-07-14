import express from 'express';
import * as userController from "../controllers/userController.js"

const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.list);
router.get('/:id', userController.searchById);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteUser);

export default router;