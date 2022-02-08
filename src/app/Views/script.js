
const url = 'http://localhost:3000/produtos/'

const msg = document.querySelector('.mensagem')

async function cadastrarProduto() {

    const nomeElement = document.querySelector('#nome')
    const precoElement = document.querySelector('#preco')
    const categoriaElement = document.querySelector('#categoria')
    const quantidadeElement = document.querySelector('#quantidade')
    const descricaoElement = document.querySelector('#descricao')

    const produto = {
        nome: nomeElement.value,
        preco: precoElement.value,
        categoria: categoriaElement.value,
        quantidade: quantidadeElement.value,
        descricao: descricaoElement.value,
    }

    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    }

    await fetch(url, init)

    msg.innerHTML = 'Produto cadastrado com sucesso!'

}


async function exibirProdutos() {

    const corpo_tabela = document.querySelector('tbody')

    corpo_tabela.innerHTML = ''

    const response = await fetch(url)

    if (response.statusText === 'OK') {

        const dados = await response.json()

        dados.map(item => {
            const linha = document.createElement('tr')
            linha.setAttribute('id', item.id)

            const nome = document.createElement('td')
            const preco = document.createElement('td')
            const categoria = document.createElement('td')
            const quantidade = document.createElement('td')
            const descricao = document.createElement('td')

            const deletar = document.createElement('td')
            deletar.setAttribute('onclick', `excluirProduto(${item.id})`)
            deletar.setAttribute('class', 'delete')

            linha.append(nome, preco, categoria, quantidade, descricao, deletar)

            nome.innerHTML = item.nome
            preco.innerHTML = item.preco
            categoria.innerHTML = item.categoria
            quantidade.innerHTML = item.quantidade
            descricao.innerHTML = item.descricao

            deletar.innerHTML = '×'

            corpo_tabela.appendChild(linha)
        })
    } else {
        msg.innerHTML = 'Não há produtos cadastrados!'
    }

}

async function excluirProduto(id) {

    const init = { method: 'DELETE' }

    await fetch(url + id, init)

    msg.innerHTML = 'Produto excluído com sucesso!'
    
    exibirProdutos()

}