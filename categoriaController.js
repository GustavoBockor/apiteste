import { Categoria } from "../model/Categoria.js";
import {
    cadastrar,
    listar,
    buscarPorIndice,
    atualizar,
    deletar
} from "../repository/categoriaRepository.js";

export function cadastrarCategoria(req, res) {
    const { nome, descricao } = req.body;

    const categoria = new Categoria(nome, descricao);
    cadastrar(categoria);

    return res.status(201).json(categoria);
}

export function listarCategorias(req, res) {
    return res.status(200).json(listar());
}

export function buscarCategoriaPorIndice(req, res) {
    const indice = Number(req.params.indice);

    if (!Number.isInteger(indice) || indice < 0) {
        return res.status(404).json({
            mensagem: "Categoria não encontrada"
        });
    }

    const categoria = buscarPorIndice(indice);

    if (!categoria) {
        return res.status(404).json({
            mensagem: "Categoria não encontrada"
        });
    }

    return res.status(200).json(categoria);
}

export function atualizarCategoria(req, res) {
    const indice = Number(req.params.indice);
    const categoriaExistente = buscarPorIndice(indice);

    if (!Number.isInteger(indice) || indice < 0 || !categoriaExistente) {
        return res.status(404).json({
            mensagem: "Categoria não encontrada"
        });
    }

    const categoriaAtualizada = {
        ...categoriaExistente,
        ...req.body
    };

    atualizar(indice, categoriaAtualizada);

    return res.status(200).json(categoriaAtualizada);
}

export function deletarCategoria(req, res) {
    const indice = Number(req.params.indice);
    const categoria = buscarPorIndice(indice);

    if (!Number.isInteger(indice) || indice < 0 || !categoria) {
        return res.status(404).json({
            mensagem: "Categoria não encontrada"
        });
    }

    deletar(indice);

    return res.status(204).send();
}
