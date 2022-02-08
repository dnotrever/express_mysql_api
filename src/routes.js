const { Router } = require('express')
const ProdutoController = require('./app/Controllers/ProdutoController')

const routes = new Router()

routes.get('/produtos', ProdutoController.exibirTodos)

routes.post('/produtos', ProdutoController.cadastrarProduto)

routes.get('/produtos/:produtoId', ProdutoController.buscarProduto)

routes.put('/produtos/:produtoId', ProdutoController.alterarProduto)

routes.delete('/produtos/:produtoId', ProdutoController.excluirProduto)

module.exports = routes