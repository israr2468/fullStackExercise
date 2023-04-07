const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { Pool } = require('pg');
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    //origin: 'http://127.0.0.1:5501'
}));

dotenv.config();

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  

async function connect() {
  try {
    await pool.connect();
    console.log('Database connection successful');
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

connect();

app.get('/api/mydata', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mytable');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data', err);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

console.log('this is server');