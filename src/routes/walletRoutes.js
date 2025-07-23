import { Router } from 'express';
import * as walletController from '../controllers/walletController.js';
// import { autenticar } from '../middlewares/autenticacao.js'; // futura autenticação

const router = Router();

// Adicionar ativo à carteira
router.post('/add', /* autenticar, */ walletController.addActive);

// Vender/remover ativo da carteira
router.post('/sell', /* autenticar, */ walletController.sellActive);

// Listar carteira atualizada
router.get('/', /* autenticar, */ walletController.listNewWallet);

export default router;