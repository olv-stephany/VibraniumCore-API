import express from 'express'
import * as investimentController from '../controllers/investimentController.js'

const router =express.Router();

router.post('/', investimentController.create);
router.get('/', investimentController.list);
router.get('/:id', investimentController.searchById);
router.put('/:id', investimentController.update);
router.delete('/:id', investimentController.deleteInvestment);

export default router;