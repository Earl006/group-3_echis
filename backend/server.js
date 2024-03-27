// server.js

// import express from 'express';
// import mysql from 'mysql';
// import cors from 'cors';
const express = require('express');
const mysql = require('mysql');

const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'echis',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// API endpoint to fetch data
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM approvals'; // Assuming your table is named 'approvals'
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
      return;
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});