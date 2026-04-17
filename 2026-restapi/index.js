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
  connection.query('SELECT * FROM teams order by powerrank desc', (err, rows, fields) => {
    if (err) throw err

    res.send(rows)
  })
})

app.get('/managers', (req, res) => {
  connection.query('SELECT * FROM managers order by name', (err, rows, fields) => {
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

app.get('/resultsandteamrgb', (req, res) => {
  connection.query(`
    SELECT 
      f.*,
      home.rgb AS homeRgb,
      away.rgb AS awayRgb
    FROM fixtures f
    JOIN teams home ON f.hteam = home.name
    JOIN teams away ON f.ateam = away.name
    WHERE f.round < 6
    ORDER BY f.round, f.division, f.hteam
  `, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
})

app.get('/fixturesandteamrgb', (req, res) => {
  connection.query(`
    SELECT 
      f.*,
      home.rgb AS homeRgb,
      away.rgb AS awayRgb
    FROM fixtures f
    JOIN teams home ON f.hteam = home.name
    JOIN teams away ON f.ateam = away.name
    WHERE f.round > 5
    ORDER BY f.round, f.division, f.hteam
  `, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
})

app.put('/teams/:name/vote', (req, res) => {
  const name = req.params.name
  connection.query('UPDATE teams SET powerrank = powerrank + 1 WHERE name = ?', [name], (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
