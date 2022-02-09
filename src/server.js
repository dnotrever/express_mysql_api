const app = require('./app')
const database = require('./config/connection')

const PORT = process.env.PORT || 3000

app.disable('x-powered-by')

app.listen(PORT, async () => {
    await database.sync( {force: true} )
    console.log(`\nApp is listening on port ${PORT}\n`)
})