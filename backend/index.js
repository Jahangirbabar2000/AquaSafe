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

app.get('/api/dashboard/:id', async (req, res) => {

    const projectId = req.params.id;
    try {

        const [project] = await connection.promise().query('SELECT * FROM AquaSafe.Projects WHERE Id = ?', [projectId]);

        const [deployedDevices] = await connection.promise().query('SELECT * FROM AquaSafe.DeployedDevices WHERE Project = ?', [projectId]);

        const deviceIds = deployedDevices.map(device => device.Id);
        const [readings] = await connection.promise().query('SELECT * FROM AquaSafe.Readings WHERE Device IN (?)', [deviceIds]);

        const unitIds = Array.from(new Set(readings.map(reading => reading.UnitId)));
        const [units] = await connection.promise().query('SELECT * FROM AquaSafe.ParameterUnits WHERE Id IN (?)', [unitIds]);

        const response = {
            project,
            deployedDevices,
            readings,
            units
        };
        res.send(response);

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error fetching data' });
    }
});


// app.get('/api/dashboard/:projectId', (req, res) => {

//     const projectId = req.params.projectId;

//     // retrieve data from deployedDevices table based on projectId
//     const deployedDevicesQuery = `SELECT * FROM AquaSafe.DeployedDevices WHERE Project = ${projectId}`;
//     connection.query(deployedDevicesQuery, (error, deployedDevicesResults, fields) => {
//         if (error) {
//             console.error(error);
//             res.status(500).send('Error retrieving deployedDevices data from database');
//         } else {
//             const deviceIds = deployedDevicesResults.map(device => device.Id);

//             // retrieve data from readings table based on deviceIds
//             const readingsQuery = `SELECT * FROM AquaSafe.Readings WHERE Device IN (${deviceIds.join()})`;
//             connection.query(readingsQuery, (error, readingsResults, fields) => {
//                 if (error) {
//                     console.error(error);
//                     res.status(500).send('Error retrieving readings data from database');
//                 } else {
//                     const unitIds = readingsResults.map(reading => reading.UnitId);

//                     // retrieve unit names from parameterunits table based on unitIds
//                     const unitsQuery = `SELECT * FROM parameterunits WHERE Id IN (${unitIds.join()})`;
//                     connection.query(unitsQuery, (error, unitsResults, fields) => {
//                         if (error) {
//                             console.error(error);
//                             res.status(500).send('Error retrieving units data from database');
//                         } else {
//                             // combine all retrieved data and send as response
//                             const data = {
//                                 deployedDevices: deployedDevicesResults,
//                                 readings: readingsResults,
//                                 units: unitsResults
//                             };
//                             res.send(data);
//                         }
//                     });
//                 }
//             });
//         }
//     });
// });


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
    connection.query('SELECT wp.Name, wp.Description, pu.Unit, pu.Min, pu.Max FROM waterparameters wp JOIN parameterunits pu ON wp.Name = pu.ParameterName', (err, rows) => {
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

app.get('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;
    connection.query('SELECT Name FROM AquaSafe.Projects WHERE Id = ?', [projectId], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching project name');
        } else if (rows.length === 0) {
            res.status(404).send('Project not found');
        } else {
            const projectName = rows[0].Name;
            res.send({ name: projectName });
        }
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

app.post('/api/deployeddevices', (req, res) => {
    const { Name, Longitude, Latitude, Frequency, Project, Locality, CommTech, StatusCode, Sensors } = req.body;
    // Validate user input (you can add more validation as per your requirements)
    if (!Name || !Project) {
        return res.status(400).json({ message: 'Please provide a device name and project ID.' });
    }

    // Insert the new deployed device into the deployeddevices table
    const insertDeviceQuery = `
        INSERT INTO deployeddevices (Name, Longitude, Latitude, Frequency, Project, Locality, CommTech, StatusCode, Sensors)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(insertDeviceQuery, [Name, Longitude, Latitude, Frequency, Project, Locality, CommTech, StatusCode, Sensors], (err, result) => {
        if (err) {
            console.error('Error inserting deployed device: ', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        return res.status(201).json({ message: 'Device added successfully.' });
    });
});

// Create route to fetch readings from database
app.get('/api/readings', (req, res) => {
    const query = `
        SELECT r.Id, r.Time, r.Reading, dd.Name as DeviceName, r.Parameter, r.UnitId, wp.Description, pu.Unit, dd.Project, p.Name as ProjectName
        FROM AquaSafe.Readings r
        JOIN AquaSafe.DeployedDevices dd ON r.Device = dd.Id
        JOIN AquaSafe.Projects p ON dd.Project = p.Id
        JOIN AquaSafe.ParameterUnits pu ON r.UnitId = pu.Id
        JOIN AquaSafe.WaterParameters wp ON pu.ParameterName = wp.Name;
    `;

    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching readings: ', err);
            res.status(500).json({ message: 'Internal server error.' });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Create route to retrieve deployed devices by project name
app.get('/api/deployeddevices/byproject/:projectName', (req, res) => {
    const projectName = req.params.projectName;
    const query = `
    SELECT dd.*
    FROM DeployedDevices dd
    JOIN Projects p ON dd.Project = p.Id
    WHERE p.Name = ?
  `;
    connection.query(query, [projectName], (err, rows) => {
        if (err) {
            console.error('Error fetching deployed devices by project name: ', err);
            res.status(500).json({ message: 'Internal server error.' });
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post('/readings/upload', async (req, res) => {
    const { projectName, deviceName, data } = req.body;

    connection.query('SELECT Id FROM AquaSafe.deployeddevices WHERE Name = ?', [deviceName], async (deviceErr, deviceRows) => {
        if (deviceErr) {
            console.error(deviceErr);
            res.status(500).send('Error fetching device');
            return;
        } else if (deviceRows.length === 0) {
            res.status(404).send('Device not found');
            return;
        }

        const deviceId = deviceRows[0].Id;

        // Store promises for each query
        const promises = [];

        data.forEach(row => {
            for (const [key, value] of Object.entries(row)) {
                // Skip the 'Date' key
                if (key === 'Date') {
                    continue;
                }

                const originalDate = row.Date;
                const [month, day, year] = originalDate.split('/');
                const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

                const [parameter, unitWithBrackets] = key.split('_(');
                const unit = unitWithBrackets.slice(0, -1); // Remove the closing parenthesis               

                const promise = new Promise((resolve, reject) => {
                    connection.query('SELECT Id FROM AquaSafe.parameterunits WHERE Unit = ? and ParameterName = ?', [unit, parameter], (unitErr, unitRows) => {
                        if (unitErr) {
                            reject(unitErr);
                        } else if (unitRows.length === 0) {
                            reject(new Error(`Unit not found for ${unit}`));
                        } else {
                            const unitId = unitRows[0].Id;

                            const reading = {
                                Time: formattedDate,
                                Reading: value,
                                Device: deviceId,
                                Parameter: parameter,
                                UnitId: unitId,
                            };

                            connection.query('INSERT INTO AquaSafe.Readings SET ?', reading, (readingErr) => {
                                if (readingErr) {
                                    reject(readingErr);
                                } else {
                                    resolve();
                                }
                            });
                        }
                    });
                });

                promises.push(promise);
            }
        });

        try {
            await Promise.all(promises);
            res.status(201).send('Readings uploaded successfully');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error: ' + error.message);
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
