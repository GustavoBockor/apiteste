
import { Produto } from "../model/Produto.js";
import {
    atualizar,
    cadastrar,
    listar,
    deletar,
    buscarPorId
} from "../repository/produtoRepository.js";

export function cadastrarProduto(req, res) {
    const { descricao, preco, peso } = req.body;

    const produto = new Produto(descricao, preco, peso);

    cadastrar(produto);

    return res.status(201).json({
        mensagem: "Produto cadastrado com sucesso"
    });
}

export function listarProdutos(req, res) {
    const listaDeProdutos = listar();

    return res.status(200).json(listaDeProdutos);
}

export function BuscarProdutoPorIndice(req, res) {
    const indice = Number(req.params.indice);

    const produto = buscarPorId(indice);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    return res.status(200).json(produto);
}

export function atualizarProduto(req, res) {
    const indice = Number(req.params.indice);

    const produto = buscarPorId(indice);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    const descricao = req.body.descricao ?? produto.descricao;
    const preco = req.body.preco ?? produto.preco;
    const peso = req.body.peso ?? produto.peso;

    const produtoNovo = new Produto(descricao, preco, peso);

    atualizar(indice, produtoNovo);

    return res.status(200).json({
        mensagem: "Produto atualizado com sucesso"
    });
}

export function deletarProduto(req, res) {
    const indice = Number(req.params.indice);

    const produto = buscarPorId(indice);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    deletar(indice);

    return res.status(204).send();
}
