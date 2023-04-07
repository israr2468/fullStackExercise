const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { Pool } = require('pg');
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5501'
}));

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
// const pool = new Pool ({connectionString: DATABASE_URL});

pool.connect();

app.get('/api/mydata', (req, res) => {
    pool.query('SELECT * FROM mytable', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
      } else {
        res.json(result.rows);
      }
    });
  });

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

console.log('this is server')