import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

router.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(query, (err, results) => {
    if (results.length > 0) {
      const token = jwt.sign({ id: results[0].id }, 'mysecretkey123');
      res.json({ token, user: results[0] });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

router.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    res.json(results);
  });
});

export default router;
