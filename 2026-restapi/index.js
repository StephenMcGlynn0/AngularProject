import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

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

app.get('/fixtures/all', (req, res) => {
  connection.query('SELECT * FROM fixtures ORDER BY round, division, hteam', (err, rows) => {
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

app.get('/scoringstats', (req, res) => {
  connection.query(`
    SELECT 
      t.name,
      t.rgb,
      scores.division,
      COUNT(*) as matches,
      ROUND((SUM(gls) / COUNT(*)), 1) as gls,
      ROUND((SUM(pts2) / COUNT(*)), 1) as pts2,
      ROUND((SUM(pts1) / COUNT(*)), 1) as pts1,
      ROUND((SUM(total) / COUNT(*)), 1) as total
    FROM (
      SELECT hteam as name, hgls as gls, h2pts as pts2, h1pts as pts1, hteamtotal as total, division FROM fixtures WHERE round < 6
      UNION ALL
      SELECT ateam as name, agls as gls, a2pts as pts2, a1pts as pts1, ateamtotal as total, division FROM fixtures WHERE round < 6
    ) scores
    JOIN teams t ON t.name = scores.name
    GROUP BY t.name, t.rgb, scores.division
  `, (err, rows) => {
    if (err) throw err
    res.send(rows)
  })
})

app.put('/fixtures/:id', (req, res) => {
  const id = req.params.id
  const { hteam, ateam, hteamscore, ateamscore, hgls, h2pts, h1pts, hteamtotal, agls, a2pts, a1pts, ateamtotal } = req.body
  connection.query(
    'UPDATE fixtures SET hteam=?, ateam=?, hteamscore=?, ateamscore=?, hgls=?, h2pts=?, h1pts=?, hteamtotal=?, agls=?, a2pts=?, a1pts=?, ateamtotal=? WHERE id=?',
    [hteam, ateam, hteamscore, ateamscore, hgls, h2pts, h1pts, hteamtotal, agls, a2pts, a1pts, ateamtotal, id],
    (err, result) => {
      if (err) throw err
      res.send(result)
    }
  )
})



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
