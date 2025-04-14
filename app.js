const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8080;

// Replace these with your Cloud SQL values
const db = mysql.createConnection({
  host: 'CLOUD_SQL_HOST',
  user: 'YOUR_USER',
  password: 'YOUR_PASSWORD',
  database: 'taskdb'
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
    process.exit();
  }
  console.log('Connected to Cloud SQL');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// CRUD Endpoints
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.post('/tasks', (req, res) => {
  const { title, status } = req.body;
  db.query('INSERT INTO tasks (title, status) VALUES (?, ?)', [title, status], err => {
    if (err) return res.status(500).send(err);
    res.sendStatus(201);
  });
});

app.put('/tasks/:id', (req, res) => {
  const { status } = req.body;
  db.query('UPDATE tasks SET status=? WHERE id=?', [status, req.params.id], err => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.delete('/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id=?', [req.params.id], err => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
