require('dotenv').config()
const Sequelize = require('sequelize')

class Connection {
    constructor() {
        this.dbConnectMySQL()
    }

    dbConnectMySQL() {
        this.MySQLConnection = new Sequelize(
            process.env.MYSQL_NAME,
            process.env.MYSQL_USER,
            process.env.MYSQL_PASS,
            {
                dialect: 'mysql',
                host: process.env.MYSQL_HOST,
                port: process.env.MYSQL_DB_PORT
            }
        )
    }
    
}

module.exports = new Connection().MySQLConnection