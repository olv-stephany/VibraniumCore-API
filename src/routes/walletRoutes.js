import { Router } from 'express';
import * as walletController from '../controllers/walletController.js';
import { authToken } from '../middlewares/authMiddleware.js'; 

const router = Router();

router.get('/', authToken, walletController.listNewWallet);
router.post('/add', authToken, walletController.addActive);
router.post('/sell', authToken, walletController.sellActive); 

export default router;