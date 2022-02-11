// substitua por sua porta e nome da tabela mysql
const url = `http://localhost:3000/produtos/`

const msg_principal = document.querySelector('.mensagem')
const msg_exebicao = document.querySelector('.msg_exibicao')

async function cadastrarProduto() {

    const form = document.querySelectorAll('.form')
    const nomeElement = document.querySelector('#nome')
    const precoElement = document.querySelector('#preco')
    const categoriaElement = document.querySelector('#categoria')
    const quantidadeElement = document.querySelector('#quantidade')
    const descricaoElement = document.querySelector('#descricao')

    if ((nomeElement.value && precoElement.value && categoriaElement.value && quantidadeElement.value) !== '') {

        preco_format = (precoElement.value).toString().replace(',', '.')

        const produto = {
            nome: nomeElement.value,
            preco: Number(preco_format),
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

        msg_principal.innerHTML = 'Produto cadastrado com sucesso!'

        const forms = Array.from(form)

        for (x in forms) {
            forms[x].value = ''
        }

    } else {

        msg_principal.innerHTML = 'Não é possível cadastrar produto!<br>Preencha os campos obrigatórios!'

    }

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

            const editar = document.createElement('td')
            editar.setAttribute('onclick', `edicaoMode(${item.id})`)
            editar.setAttribute('class', 'edit')

            linha.append(nome, preco, categoria, quantidade, descricao, deletar, editar)

            nome.innerHTML = item.nome
            preco.innerHTML = item.preco.toFixed(2)
            categoria.innerHTML = item.categoria
            quantidade.innerHTML = item.quantidade
            descricao.innerHTML = item.descricao

            deletar.innerHTML = '×'
            editar.innerHTML = '✎'

            corpo_tabela.appendChild(linha)

            msg_exebicao.innerHTML = ''

        })

    } else {

        msg_principal.innerHTML = 'Não há produtos cadastrados!'

    }

}

async function excluirProduto(id) {

    const init = { method: 'DELETE' }

    await fetch(url + id, init)

    msg_principal.innerHTML = 'Produto excluído com sucesso!'

    exibirProdutos()

}

async function edicaoMode(id) {

    const item = document.getElementById(id)

    item.innerHTML = ''

    const nomeElement = document.createElement('td')
    const precoElement = document.createElement('td')
    const categoriaElement = document.createElement('td')
    const quantidadeElement = document.createElement('td')
    const descricaoElement = document.createElement('td')

    const botaoElement = document.createElement('td')

    const nomeInput = document.createElement('input')
    const precoInput  = document.createElement('input')
    const categoriaInput = document.createElement('input')
    const quantidadeInput = document.createElement('input')
    const descricaoInput = document.createElement('input')

    const botaoInput = document.createElement('button')

    nomeElement.appendChild(nomeInput).setAttribute('id', 'nome_edit')
    precoElement.appendChild(precoInput).setAttribute('id', 'preco_edit')
    categoriaElement.appendChild(categoriaInput).setAttribute('id', 'categoria_edit')
    quantidadeElement.appendChild(quantidadeInput).setAttribute('id', 'quantidade_edit')
    descricaoElement.appendChild(descricaoInput).setAttribute('id', 'descricao_edit')

    botaoElement.appendChild(botaoInput)

    const dados = await (await fetch(url + id)).json()

    nomeInput.value = dados.nome
    precoInput.value = dados.preco
    categoriaInput.value = dados.categoria
    quantidadeInput.value = dados.quantidade
    descricaoInput.value = dados.descricao

    item.append(nomeElement, precoElement, categoriaElement, quantidadeElement, descricaoElement, botaoElement)

    botaoInput.setAttribute('onclick', `editarProduto(${id})`)

    botaoInput.innerHTML = 'Editar'

}

async function editarProduto(id) {

   const nome = document.querySelector('#nome_edit')
   const preco = document.querySelector('#preco_edit')
   const categoria = document.querySelector('#categoria_edit')
   const quantidade = document.querySelector('#quantidade_edit')
   const descricao = document.querySelector('#descricao_edit')

   const produto = {
       nome: nome.value,
       preco: preco.value,
       categoria: categoria.value,
       quantidade: quantidade.value,
       descricao: descricao.value
   }

    const init = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    }

    await fetch(url + id, init)

    msg_principal.innerHTML = 'Produto editado com sucesso!'
    
    exibirProdutos()

}