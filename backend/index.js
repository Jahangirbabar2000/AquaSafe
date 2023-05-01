const express = require('express');
const mysql = require('mysql2');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Initialize express app
const app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});


// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

try {
    connection.connect();
}
catch (err) { console.log(err); }

app.post('/api/register', (req, res) => {
    const { firstName, lastName, email, password, designation, country, site } = req.body;
    // Validate user input (you can add more validation as per your requirements)
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Check if email already exists in the database
    const checkUserQuery = `SELECT * FROM AquaSafe.Users WHERE email = ?`;
    connection.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking for existing user: ', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length > 0) {
            return res.status(409).json({ message: 'email already exists.' });
        }

        // Hash the password using bcrypt
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password: ', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            // Insert the user into the users table
            const insertUserQuery = 'INSERT INTO users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)';
            connection.query(insertUserQuery, [firstName, lastName, email, hashedPassword], (err, userInsertResult) => {
                if (err) {
                    console.error('Error inserting user: ', err);
                    return res.status(500).json({ message: 'Internal server error.' });
                }

                // Fetch the user ID and the project ID based on the project name
                const fetchIdsQuery = `
          SELECT Users.Id AS userId, Projects.Id AS projectId
          FROM Users, Projects
          WHERE Users.Id = ? AND Projects.Name = ?
        `;
                connection.query(fetchIdsQuery, [userInsertResult.insertId, site], (err, fetchIdsResult) => {
                    if (err) {
                        console.error('Error fetching user and project IDs: ', err);
                        return res.status(500).json({ message: 'Internal server error.' });
                    }

                    if (fetchIdsResult.length === 0) {
                        return res.status(404).json({ message: 'User or project not found.' });
                    }

                    const userId = fetchIdsResult[0].userId;
                    const projectId = fetchIdsResult[0].projectId;

                    // Insert the entry into the workson table
                    const insertWorksonQuery = 'INSERT INTO AquaSafe.WorksOn (user, project, Designation) VALUES (?, ?, ?)';
                    connection.query(insertWorksonQuery, [userId, projectId, designation], (err) => {
                        if (err) {
                            console.error('Error inserting workson entry: ', err);
                            return res.status(500).json({ message: 'Internal server error.' });
                        }

                        return res.status(201).json({ message: 'User registered successfully.' });
                    });
                });
            });
        });
    });
});

// Add this route for user authentication
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    // Retrieve the user record from the database based on the provided email
    const getUserQuery = `
        SELECT users.Id, users.Email, users.Password, users.FirstName, users.LastName, workson.Designation
        FROM users
        INNER JOIN workson ON users.Id = workson.user
        WHERE users.Email = ?`;
    connection.query(getUserQuery, [email], (err, results) => {
        if (err) {
            console.error('Error retrieving user: ', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = results[0];

        // Compare the provided password with the stored hashed password using bcrypt
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing password: ', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Incorrect password.' });
            }

            // If the password is valid, generate a JSON Web Token (JWT) and send it as a response
            const jwtPayload = { id: user.Id, firstName: user.FirstName, lastName: user.LastName, email: user.Email, designation: user.Designation };
            const jwtSecret = process.env.JWT_SECRET;
            const jwtOptions = { expiresIn: '1h' };

            jwt.sign(jwtPayload, jwtSecret, jwtOptions, (err, token) => {
                if (err) {
                    console.error('Error generating JWT: ', err);
                    return res.status(500).json({ message: 'Internal server error.' });
                }

                return res.status(200).json({ message: 'Login successful.', token: token, user: { id: user.Id, firstName: user.FirstName, lastName: user.LastName, email: user.Email, designation: user.Designation } });
            });
        });
    });
});


// Create route to retrieve data from database
app.get('/data', (req, res) => {
    connection.query('SELECT r.Time, r.Reading, sc.Parameter FROM AquaSafe.readings as r, aquasafe.sensorscatalogue as sc where r.Sensor = sc.Id;', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});


// Create route to retrieve data from  hong kong dataset
app.get('/hkdata', (req, res) => {
    connection.query('SELECT * from HongKongDataSet where Dates between "2014-01-01" and "2016-01-15";', (err, rows) => {
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


// Create route to retrieve stationCoordinates from  hong kong dataset 
app.get('/stationCoordinates', (req, res) => {
    connection.query('SELECT * FROM AquaSafe.stationCoordinates;', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

// Create route to retrieve a specific user by ID
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT Users.Id, FirstName, LastName, Email, Designation, Country, Name as Site FROM Users JOIN WorksOn ON Users.Id = WorksOn.user JOIN Projects ON Projects.id = WorksOn.project WHERE Users.Id = ?;', [id], (err, rows) => {
        if (err) {
            console.error('Error retrieving user by ID: ', err);
            res.status(500).json({ message: 'Internal server error.' });
        } else {
            if (rows.length === 0) {
                res.status(404).json({ message: 'User not found.' });
            } else {
                res.status(200).json(rows[0]);
            }
        }
    });
});

app.get('/activeUsers', (req, res) => {
    connection.query('SELECT Users.Id, FirstName, LastName, Email, Designation, Country, Name as Site from Users join WorksOn on Users.Id = WorksOn.user join Projects on Projects.id = WorksOn.project;', (err, rows) => {
        if (err) throw err;

        res.send(rows);
    });
});

// Add this route to update a user's data in the database
app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    // Update the user's data in the users table
    const updateUserQuery = 'UPDATE users SET FirstName = ?, LastName = ?, Email = ? WHERE Id = ?';
    connection.query(updateUserQuery, [updatedUser.FirstName, updatedUser.LastName, updatedUser.Email, id], (err) => {
        if (err) {
            console.error('Error updating user: ', err);
            res.status(500).json({ message: 'Internal server error.' });
        } else {
            // Hash the new password using bcrypt
            bcrypt.hash(updatedUser.Password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password: ', err);
                    return res.status(500).json({ message: 'Internal server error.' });
                }

                // Update the hashed password in the users table
                const updatePasswordQuery = 'UPDATE users SET Password = ? WHERE Id = ?';
                connection.query(updatePasswordQuery, [hashedPassword, id], (err) => {
                    if (err) {
                        console.error('Error updating password: ', err);
                        res.status(500).json({ message: 'Internal server error.' });
                    } else {
                        // Update the user's data in the workson table
                        const updateWorksonQuery = 'UPDATE workson SET Designation = ? WHERE user = ?';
                        connection.query(updateWorksonQuery, [updatedUser.Designation, id], (err) => {
                            if (err) {
                                console.error('Error updating workson: ', err);
                                res.status(500).json({ message: 'Internal server error.' });
                            } else {
                                res.status(200).json({ message: 'User updated successfully.' });
                            }
                        });
                    }
                });
            });
        }
    });
});



// Defining API endpoint for deleting a user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    // Construct SQL query to delete user's assignments in workson table
    const worksonQuery = `DELETE FROM workson WHERE user = ?`;

    // Execute workson SQL query
    connection.query(worksonQuery, [id], (error) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error deleting user assignments from MySQL' });
            return;
        }

        // Construct SQL query to delete user by ID
        const usersQuery = `DELETE FROM users WHERE Id = ?`;

        // Execute users SQL query
        connection.query(usersQuery, [id], (error) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Error deleting user from MySQL' });
            } else {
                res.status(200).json({ message: 'User deleted successfully from MySQL' });
            }
        });
    });
});


app.get('/sensorsTable', (req, res) => {
    connection.query('SELECT * FROM AquaSafe.SensorsCatalogue;', (err, rows) => {
        if (err) throw err;

        res.send(rows);
    });
});

// Defining API endpoint for deleting a MySQL entry by ID
app.delete('/sensors/:id', (req, res) => {
    const id = req.params.id;

    // Construct SQL query to delete entry by ID
    const query = `DELETE FROM AquaSafe.SensorsCatalogue WHERE Id=${id};`;

    // Execute SQL query
    connection.query(query, (error) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error deleting entry from MySQL' });
        } else {
            res.status(200).json({ message: 'Entry deleted successfully from MySQL' });
        }
    });
});

// Defining API endpoint for adding a MySQL entry by ID
app.post('/sensors', (req, res) => {
    const data = req.body;
    const query = `INSERT into SensorsCatalogue(Parameter, Model, SensorMin, SensorMax) VALUES('${data.Parameter}', '${data.Model}', ${data.SensorMin}, ${data.SensorMax});`;

    // Execute SQL query
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error adding data to MySQL' });
        } else {
            res.status(200).json({ message: 'Data added successfully to MySQL', id: results.insertId });
        }
    });
});

// Create route to retrieve parameters data from database
app.get('/parameters', (req, res) => {
    connection.query('select * from WaterParameters', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.post('/parameters', (req, res) => {
    const data = req.body;
    const query = `INSERT into WaterParameters(Name, Description, Unit, Min, Max) VALUES('${data.ParameterName}', '${data.ParameterDescription}', '${data.ParameterUnit}', ${data.ParameterMin}, ${data.ParameterMax});`;
    connection.query(query, (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Error adding data to MySQL' });
        } else {
            res.status(200).json({ message: 'Data added successfully to MySQL', id: results.insertId });
        }
    });
});

// Defining API endpoint for deleting a MySQL entry by ID
app.delete('/parameters/:name', (req, res) => {

    const Name = req.params.name;
    // Construct SQL query to delete entry by ID
    const query = `DELETE FROM AquaSafe.WaterParameters WHERE Name='${Name}';`;
    // Execute SQL query
    connection.query(query, (error) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Error deleting entry from MySQL' });
        } else {
            res.status(200).json({ message: 'Entry deleted successfully from MySQL' });
        }
    });
});

app.get('/projects', (req, res) => {
    connection.query('select * from AquaSafe.Projects', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.post('/projects', (req, res) => {
    const data = req.body;
    const query = ` INSERT into AquaSafe.Projects (Name, Location, Country, Longitude, Latitude, Description) VALUES('${data.Name}', '${data.Location}', '${data.Country}', ${data.Longitude}, ${data.Latitude}, '${data.Description}');`;
    // Execute SQL query
    connection.query(query, (error) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Error deleting entry from MySQL' });
        } else {
            res.status(200).json({ message: 'Entry deleted successfully from MySQL' });
        }
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
