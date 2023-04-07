# fullStackExercise
Step-by-step guide to creating a PostgreSQL database and connecting it to a RESTful Express server:

1. Create a new database: Open the psql command-line tool and create a new database. For example, if you want to create a database called mydb, run:

====================================================================================================================
docker container ls
docker exec -it <numberForYourContainer> bash
psql -U postgres 
\l
CREATE DATABASE <dataBaseName>;
\c <dataBaseName>
====================================================================================================================

2. Install dependencies: Create a new directory for your project and navigate to it in your terminal. Run npm init to create a package.json file for your project, then install the necessary dependencies by running:

====================================================================================================================
npm install express dotenv pg nodemon cors
====================================================================================================================

    - express is for creating the server, dotenv is for loading environment variables from a .env file, and pg is for connecting to the PostgreSQL database.

3. Create a .env file: Create a .env file in the root directory of your project and add the following variables with your database credentials:

====================================================================================================================
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_DATABASE=your_database_name

# Make sure to replace the values with your own database credentials.
# DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}
# DATABASE_URL=postgresql://postgres:docker@localhost:5432/fullstackexercise
====================================================================================================================

4. Create an Express server: Create a new file called server.js in the root directory of your project and add the following code to create an Express server and connect to the database:

====================================================================================================================
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { Pool } = require('pg');
const cors = require('cors')

app.use(express.json());
app.use(cors({
    origin: '<html address in here>'
}));

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

# const pool = new Pool ({connectionString: DATABASE_URL});

pool.connect();

# Define your API endpoints here
app.get('/api/<nameOfPathT>', (req, res) => {
  pool.query('SELECT * FROM <nameOfTable>', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(result.rows);
    }
  });
});

# Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
====================================================================================================================

    - This code creates an Express server and uses the pg module to connect to the database using the credentials from the .env file. It also defines a simple endpoint that fetches data from a table called mytable.

5. Test the server: Start the server by running node server.js in your terminal. Open a browser and navigate to http://localhost:3000/ to test the endpoint you defined.

6. Create an index.HTML and app.js file in a public folder
    1. Making sure to put the script source at the bottom of the body for the index.html as so:

====================================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class Roster</title>
    <script src="index.js"></script>
</head>
<body>
    <h1>Students</h1>
    <div id="students-container"></div>
</body>
</html>

====================================================================================================

    2. This is the general body of code to get a container going:

====================================================================================================
console.log('Fetching student data...');
const studentsContainer = document.getElementById("students-container");
fetch('http://localhost:3003/api/students')
    .then(response => response.json())
    .then(data => {
        data.forEach(student => {
            const studentElement = document.createElement("div");
            studentElement.innerText = `${student.name} ${student.github_name} ${student.email}`;
            studentsContainer.appendChild(studentElement);
        });
    })
    .catch(error => console.error(error));
====================================================================================================

That's it! You've now created a PostgreSQL database and connected it to a RESTful Express server. You can add more endpoints to your server to create a full CRUD API for your database.