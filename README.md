FullStackExercise - Step-by-Step Guide
This is a step-by-step guide to create a PostgreSQL database and connect it to a RESTful
Express server.
Creating a Database
. Open the psql command-line tool and create a new database. For example, if you want
to create a database called "mydb," run:
docker container ls docker exec -it bash psql -U postgres \l CREATE
DATABASE mydb; \c mydb
Installing Dependencies
. Create a new directory for your project and navigate to it in your terminal.
. Run npm init to create a package.json file for your project.
. Install the necessary dependencies by running:
npm install express dotenv pg nodemon cors
Creating a .env File
. Create a .env file in the root directory of your project.
. Add the following variables with your database credentials to the .env file:
bash Copy code
Copy code
Express is for creating the server.
dotenv is for loading environment variables from a .env file.
pg is for connecting to the PostgreSQL database.
makefile Copy code
DB_USER=your_database_username DB_PASSWORD=your_database_password
DB_HOST=your_database_host DB_PORT=your_database_port
DB_DATABASE=your_database_name
. Add the following to connect to the database:
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${
DATABASE_URL=postgresql://postgres:docker@localhost:5432/fullstackexercise
Creating an Express Server
. Create a new file called server.js in the root directory of your project.
. Add the following code to create an Express server and connect to the database:
const express = require('express'); const app = express(); const dotenv =
require('dotenv'); const { Pool } = require('pg'); const cors =
require('cors'); app.use(express.json()); app.use(cors({ origin: '' }));
dotenv.config(); const pool = new Pool({ user: process.env.DB_USER, host:
process.env.DB_HOST, database: process.env.DB_DATABASE, password:
process.env.DB_PASSWORD, port: process.env.DB_PORT, }); const pool = new
Pool ({connectionString: DATABASE_URL}); pool.connect(); // Define your
API endpoints here. app.get('/api/', (req, res) => { pool.query('SELECT *
FROM mytable', (err, result) => { if (err) { console.error(err);
res.status(500).send('Error fetching data'); } else {
res.json(result.rows); } }); }); const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server listening on port ${port}`);
});
Make sure to replace the values with your own database credentials.
bash Copy code
javascript Copy code
This code creates an Express server and uses the pg module to connect to the
database using the credentials from the .env file.
It also defines a simple endpoint that fetches data from a table called mytable.
Testing the Server
. Start the server by running node server.js in your terminal.
. Open a browser and navigate to http://localhost:3000/ to test the endpoint you
defined.
Creating an HTML File and JS File
. Create an index.html and app.js file in a public folder.
. Make sure to put the script source at the bottom of the body for the index.html as so:
<title>Class Roster</title> <script src="index.js"></script> Students
. Add the
php Copy code
can you finish the rest of the notes starting from:
Creating an HTML File and JS File
Create an index.html and app.js file in a public folder.
Make sure to put the script source at the bottom of the body for the index.html as so:
Sure! Here are the next steps:
. Create a new folder in your project directory called "public".
. Inside the "public" folder, create a new file called "index.html".
. Copy and paste the following code into the "index.html" file:
<!DOCTYPE html> <html> <head> <title>Class Roster</title> </head> <body>
<div id="students-container"></div> <script src="app.js"></script>
</body> </html>
php Copy code
. This code creates a basic HTML page with a container div for displaying student data
and a script tag for including the JavaScript file.
. Save the "index.html" file.
. Inside the "public" folder, create a new file called "app.js".
. Copy and paste the following code into the "app.js" file:
console.log('Fetching student data...'); const studentsContainer =
document.getElementById("students-container");
fetch('http://localhost:3000/api/students') .then(response =>
response.json()) .then(data => { data.forEach(student => { const
studentElement = document.createElement("div"); studentElement.innerText
= `${student.name} ${student.github_name} ${student.email}`;
studentsContainer.appendChild(studentElement); }); }) .catch(error =>
console.error(error));
. This code fetches student data from the server and displays it in the container div on
the HTML page.
. Save the "app.js" file.
. Start the server by running node server.js in your terminal.
. Open a browser and navigate to http://localhost:3000/ to see the student data
displayed on the HTML page.
That's it! You've now created a simple full-stack application with a PostgreSQL database,
a RESTful Express server, and a client-side HTML and JavaScript interface. You can
continue to build on this foundation by adding more functionality, such as form input for
adding new students or editing existing ones, or authentication and authorization for
secure access to the API.
