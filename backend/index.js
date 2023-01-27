const express = require('express');
const mysql = require('mysql2');

// Initialize express app
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jb123456',
    database: 'AquaSafe'
});

try {
    connection.connect();
}
catch (err) { console.log(err); }

// Create route to retrieve data from database
app.get('/data', (req, res) => {
    connection.query('SELECT r.Time, r.Reading, sc.Parameter FROM aquasafe.readings as r, aquasafe.sensorscatalogue as sc where r.Sensor = sc.Id;', (err, rows) => {
        if (err) throw err;

        res.send(rows);
    });
});

app.get('/activeUsers', (req, res) => {
    connection.query('SELECT * from users;', (err, rows) => {
        if (err) throw err;

        res.send(rows);
    });
});

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
