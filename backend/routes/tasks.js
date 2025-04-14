const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks');
  res.json(result.rows);
});

router.post('/', upload.single('file'), async (req, res) => {
  const { title, description } = req.body;
  await pool.query(
    'INSERT INTO tasks (title, description) VALUES ($1, $2)',
    [title, description]
  );
  res.json({ message: 'Task added' });
});

module.exports = router;
