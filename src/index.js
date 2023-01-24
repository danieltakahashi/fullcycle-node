const express = require('express')
const app = express()
const mysql = require('mysql')
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'fullcycle'
}
const connection = mysql.createConnection(config)
var random_name = require('node-random-name');

connection.query(`CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`)

app.get('/', (req, res) => {
    connection.query(`INSERT INTO people(name) values('${random_name()}')`)
    connection.query(`SELECT name FROM people`, function (err, results, fields) {
        if (err) throw err

        names = results.map((entry) => `- ${entry.name}`).join('<br>')

        res.send('<h1>Full Cycle Rocks!</h1><br>' + names)
    })

    connection.end
})

app.listen(3000, () => {
    console.log('Rodando na porta 3000')
})