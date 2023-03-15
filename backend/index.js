const express = require('express');
const mysql = require('mysql2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());



// Create connection to database using mysql2
const connection = mysql.createConnection({
    host: 'localhost', // find host on RDS
    user: 'root', // user for RDS is 'admin'
    password: 'jb123456', // same on RDS
    database: 'AquaSafe' // same on RDS
});

try {
    connection.connect();
}
catch (err) { console.log(err); }

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, (email, password, done) => {
//     connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
//         if (results.length > 0 && results[0].password) {
//             const hash = results[0].password.toString();
//             bcrypt.compare(password, hash, function (err, passwordMatches) {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).json({ message: 'Internal server error' });
//                 }

//                 if (passwordMatches) {
//                     req.session.email = email;
//                     return res.status(200).json({ message: 'Login successful' });
//                 } else {
//                     return res.status(401).json({ message: 'Email or password is incorrect' });
//                 }
//             });
//         } else {
//             return res.status(401).json({ message: 'Email or password is incorrect' });
//         }
//     });
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
//         done(err, results[0]);
//     });
// });

// app.post('/', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
//     const data = req.body;
//     console.log(data)
// });

app.post('/signup', (req, res) => {
    const data = req.body;
    console.log(data);
    connection.query(
        "INSERT INTO Users (FirstName, LastName, Email, Password, Designation, Country, Site) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [data.firstName, data.lastName, data.email, data.password, data.designation, data.country, data.site],
        (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Data inserted successfully");
            }
        }
    );
});

app.post('/signin', (req, res) => {
    const data = req.body;
    console.log(data);
    // connection.query(
    //     "INSERT INTO Users (FirstName, LastName, Email, Password, Designation, Country, Site) VALUES (?, ?, ?, ?, ?, ?, ?)",
    //     [data.firstName, data.lastName, data.email, data.password, data.designation, data.country, data.site],
    //     (error, results) => {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log("Data inserted successfully");
    //         }
    //     }
    // );
});


// Create route to retrieve data from database
app.get('/data', (req, res) => {
    connection.query('SELECT r.Time, r.Reading, sc.Parameter FROM aquasafe.readings as r, aquasafe.sensorscatalogue as sc where r.Sensor = sc.Id;', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});


// Create route to retrieve data from  hong kong dataset
app.get('/hkdata', (req, res) => {
    connection.query('SELECT * from HongKongDataSet where Dates between "2018-01-01" and "2018-01-15";', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

// Create route to retrieve data from  hong kong dataset
app.get('/hkdata2', (req, res) => {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    connection.query(`SELECT * from HongKongDataSet where Dates between '${startDate}' and '${endDate}';`, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/activeUsers', (req, res) => {
    connection.query('SELECT FirstName, Email, Designation, Country, Name as Site from Users join WorksOn on Users.Id = WorksOn.user join Projects on Projects.id = WorksOn.project;', (err, rows) => {
        if (err) throw err;

        res.send(rows);
    });
});

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});


// // Code for merging react static files with backend
// const path = require('path')
// const _dirname = path.dirname("")
// const buildPath = path.join(_dirname, "../my-app/build");
// app.use(express.static(buildPath))
// app.get("/*", function (req, res) {

//     res.sendFile(
//         path.join(__dirname, "../my-app/build/index.html"),
//         function (err) {
//             if (err) {
//                 res.status(500).send(err);
//             }
//         }
//     )
// })
// //////////////////////////////////////////////////////////