import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

app.use(cors())

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gaanfl2026'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/players', (req, res) => {
  connection.query('SELECT * FROM players', (err, rows, fields) => {
    if (err) throw err

    res.send(rows)
  })
})

app.get('/teams', (req, res) => {
  connection.query('SELECT * FROM teams', (err, rows, fields) => {
    if (err) throw err

    res.send(rows)
  })
})

app.get('/managers', (req, res) => {
  connection.query('SELECT * FROM managers', (err, rows, fields) => {
    if (err) throw err

    res.send(rows)
  })
})

app.get('/fixtures', (req, res) => {
  connection.query('SELECT * FROM fixtures WHERE round > 5', (err, rows, fields) => {
    if (err) throw err

    res.send(rows)
  })
})

app.get('/results', (req, res) => {
  connection.query('SELECT * FROM fixtures WHERE round < 6', (err, rows, fields) => {
    if (err) throw err

    res.send(rows)
  })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
