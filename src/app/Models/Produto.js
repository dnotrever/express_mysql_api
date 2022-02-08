const Sequelize = require('sequelize')
const database = require('../../config/connection')

const Produto = database.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    preco: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },

    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    descricao: Sequelize.STRING,
})

module.exports = Produto