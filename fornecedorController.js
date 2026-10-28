
import { Fornecedor } from "../model/Fornecedor.js";
import {
    cadastrar,
    listar,
    buscarPorIndice,
    atualizar,
    deletar
} from "../repository/fornecedorRepository.js";

export function cadastrarFornecedor(req, res) {
    const { nome, cnpj, telefone } = req.body;

    const fornecedor = new Fornecedor(nome, cnpj, telefone);
    cadastrar(fornecedor);

    return res.status(201).json(fornecedor);
}

export function listarFornecedores(req, res) {
    return res.status(200).json(listar());
}

export function buscarFornecedorPorIndice(req, res) {
    const indice = Number(req.params.indice);

    if (!Number.isInteger(indice) || indice < 0) {
        return res.status(404).json({
            mensagem: "Fornecedor não encontrado"
        });
    }

    const fornecedor = buscarPorIndice(indice);

    if (!fornecedor) {
        return res.status(404).json({
            mensagem: "Fornecedor não encontrado"
        });
    }

    return res.status(200).json(fornecedor);
}

export function atualizarFornecedor(req, res) {
    const indice = Number(req.params.indice);
    const fornecedorExistente = buscarPorIndice(indice);

    if (!Number.isInteger(indice) || indice < 0 || !fornecedorExistente) {
        return res.status(404).json({
            mensagem: "Fornecedor não encontrado"
        });
    }

    const fornecedorAtualizado = {
        ...fornecedorExistente,
        ...req.body
    };

    atualizar(indice, fornecedorAtualizado);

    return res.status(200).json(fornecedorAtualizado);
}

export function deletarFornecedor(req, res) {
    const indice = Number(req.params.indice);
    const fornecedor = buscarPorIndice(indice);

    if (!Number.isInteger(indice) || indice < 0 || !fornecedor) {
        return res.status(404).json({
            mensagem: "Fornecedor não encontrado"
        });
    }

    deletar(indice);

    return res.status(204).send();
}
