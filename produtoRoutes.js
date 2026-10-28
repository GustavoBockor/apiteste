import { Router } from 'express';

import {
    cadastrarProduto,
    listarProdutos,
    BuscarProdutoPorIndice,
    atualizarProduto,
    deletarProduto
} from '../controller/produtoController.js';

const router = Router();

router.post('/', cadastrarProduto);
router.get('/', listarProdutos);
router.get('/:indice', BuscarProdutoPorIndice);
router.put('/:indice', atualizarProduto);
router.delete('/:indice', deletarProduto);

export default router;
