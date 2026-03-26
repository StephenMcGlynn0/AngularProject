import express from 'express'
import mysql from 'mysql'

const app = express()

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'gaanfl2026'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/players', (req, res) =>{
    connection.query('SELECT * FROM players', (err, rows, fields) => {
  if (err) throw err

console.log(rows)
  res.send(rows)
})
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})