const ProdutoModel = require('../../app/Models/Produto')

class ProdutoController {

    async exibirTodos(req, res) {
        const produtos = await ProdutoModel.findAll()
        return produtos.length > 0 ? res.status(200).json(produtos) : res.status(204).send()
    }

    async buscarProduto(req, res) {
        const { produtoId } = req.params
        const produto = await ProdutoModel.findOne({where: {id: produtoId}})
        return produto ? res.status(200).json(produto) : res.status(204).send()
    }
    
    async cadastrarProduto(req, res) {
        const { nome, preco, categoria, quantidade, descricao } = req.body
        const dados = {nome, preco, categoria, quantidade, descricao}
        const produto = await ProdutoModel.create(dados)
        return res.status(201).json(produto)
    }

    async alterarProduto(req, res) {
        const { produtoId } = req.params
        const { nome, preco, categoria, quantidade, descricao } = req.body
        const dados = {nome, preco, categoria, quantidade, descricao}
        await ProdutoModel.update(dados, {where: {id: produtoId}})
        return res.status(204).send()
    }

    async excluirProduto(req, res) {
        const { produtoId } = req.params
        await ProdutoModel.destroy({where: {id: produtoId}})
        return res.status(204).send() 
    }

}

module.exports = new ProdutoController()