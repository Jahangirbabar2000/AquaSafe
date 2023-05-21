const express = require('express');
const mysql = require('mysql2');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const webpush = require('web-push');
const cors = require('cors');
const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();
dotenv.config();

// console.log(process.env.VAPID_PUBLIC_KEY);

// Set VAPID keys
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);


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
app.use(cors());
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

app.get('/api/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendUpdate = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const eventListener = (newData) => {
        sendUpdate(newData);
    };

    eventEmitter.on('newData', eventListener);

    req.on('close', () => {
        eventEmitter.off('newData', eventListener);
    });
});


app.post('/api/reading', (req, res) => {

    const { deviceId, sensorData } = req.body.readings;
    // const { deviceId, sensorData } = req.body;

    sensorData.forEach(async (data) => {
        const insertDataQuery = 'INSERT INTO AquaSafe.Readings (Time, Reading, Device, Parameter, UnitId) VALUES (?, ?, ?, ?, ?)';
        connection.query(insertDataQuery, [new Date(), data.reading, deviceId, data.parameter, data.unitId], async (err, result) => {
            if (err) {
                console.error('Error inserting sensor data: ', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            const insertedDataQuery = 'SELECT * FROM AquaSafe.Readings WHERE Id = ?';
            const [insertedData] = await connection.promise().query(insertedDataQuery, [result.insertId]);
            if (!insertedData) {
                console.error('Failed to retrieve newly added reading from the database');
                return;
            }
            // After inserting sensor data, emit an event with the new data
            eventEmitter.emit('newData', insertedData);

            const checkThresholdQuery = 'SELECT * FROM AquaSafe.ParameterUnits WHERE Id = ? AND (Min > ? OR Max < ?)';
            connection.query(checkThresholdQuery, [data.unitId, data.reading, data.reading], (err, results) => {
                if (err) {
                    console.error('Error checking thresholds: ', err);
                    return res.status(500).json({ message: 'Internal server error.' });
                }

                if (results.length > 0) {
                    const threshold = results[0];
                    const fetchProjectQuery = 'SELECT P.Name, P.Location, P.Country FROM AquaSafe.Projects P INNER JOIN AquaSafe.DeployedDevices D ON P.Id = D.Project WHERE D.Id = ?';
                    connection.query(fetchProjectQuery, [deviceId], (err, projectResults) => {
                        if (err) {
                            console.error('Error fetching project: ', err);
                            return res.status(500).json({ message: 'Internal server error.' });
                        }

                        const project = projectResults[0];
                        const location = `${project.Name}, ${project.Location}, ${project.Country}`;

                        const fetchUsersQuery = 'SELECT user FROM AquaSafe.WorksOn WHERE project = (SELECT Project FROM AquaSafe.DeployedDevices WHERE Id = ?)';
                        connection.query(fetchUsersQuery, [deviceId], (err, users) => {
                            if (err) {
                                console.error('Error fetching users: ', err);
                                return res.status(500).json({ message: 'Internal server error.' });
                            }
                            users.forEach(row => {
                                const payload = {
                                    title: 'Threshold Breached',
                                    body: `The ${data.parameter} sensor on device ${deviceId} has breached its threshold. Current reading is ${data.reading} while the threshold is ${threshold.Min} to ${threshold.Max}.`
                                };;


                                const fetchSubscriptionQuery = 'SELECT * FROM AquaSafe.Subscriptions WHERE UserId = ?';
                                connection.query(fetchSubscriptionQuery, [row.user], (err, results) => {
                                    if (err) {
                                        console.error('Error fetching subscriptions: ', err);
                                        return res.status(500).json({ message: 'Internal server error.' });
                                    }

                                    if (results.length === 0) {
                                        console.error('Subscription not found for user: ', row.user);
                                        return; // We can't send a 404 here as it would stop the processing of the other users.
                                    }

                                    const subscription = JSON.parse(results[0].Subscription);
                                    webpush.sendNotification(subscription, JSON.stringify(payload))
                                        .catch(err => {
                                            console.error('Error sending notification: ', err);
                                        });

                                    // Adding the entry to the Notifications table
                                    const notificationPriority = data.reading < results[0].Min ? 'low' : 'high'; // Assuming low if below Min and high if above Max
                                    const insertNotificationQuery = 'INSERT INTO AquaSafe.Notifications (Priority, Location, Description, Device, Reading, Time, User, IsViewed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                                    connection.query(insertNotificationQuery, [notificationPriority, location, payload.body, deviceId, result.insertId, new Date(), row.user, 0], (err) => {
                                        if (err) {
                                            console.error('Error inserting into Notifications: ', err);
                                        }
                                    });
                                });
                            });
                        });
                    });
                }
            });
        });
    });
    res.json({ message: 'Data received.' });
});

app.post('/api/subscribe', (req, res) => {
    const subscription = req.body.subscription;
    const userId = req.body.userId;

    // Insert subscription into the Subscriptions table
    const insertSubscriptionQuery = 'INSERT INTO AquaSafe.Subscriptions (UserId, Subscription) VALUES (?, ?)';
    connection.query(insertSubscriptionQuery, [userId, JSON.stringify(subscription)], (err, result) => {
        if (err) {
            console.error('Error inserting subscription: ', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        return res.status(201).json({ message: 'Subscription stored successfully.' });
    });
});

app.post('/api/notify', (req, res) => {
    const userId = req.body.userId;
    const payload = req.body.payload;

    // Fetch subscription for the user
    const fetchSubscriptionQuery = 'SELECT Subscription FROM AquaSafe.Subscriptions WHERE UserId = ?';
    connection.query(fetchSubscriptionQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching subscription: ', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Subscription not found.' });
        }

        const subscription = JSON.parse(results[0].Subscription);

        // Send the notification
        webpush.sendNotification(subscription, payload)
            .then(() => res.status(200).json({ message: 'Notification sent.' }))
            .catch(err => {
                console.error('Error sending notification: ', err);
                return res.status(500).json({ message: 'Internal server error.' });
            });
    });
});

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
            const insertUserQuery = 'INSERT INTO AquaSafe.Users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)';
            connection.query(insertUserQuery, [firstName, lastName, email, hashedPassword], (err, userInsertResult) => {
                if (err) {
                    console.error('Error inserting user: ', err);
                    return res.status(500).json({ message: 'Internal server error.' });
                }

                // Fetch the user ID and the project ID based on the project name
                const fetchIdsQuery = `
          SELECT Users.Id AS userId, Projects.Id AS projectId
          FROM AquaSafe.Users, AquaSafe.Projects
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
        SELECT Users.Id, Users.Email, Users.Password, Users.FirstName, Users.LastName, WorksOn.Designation
        FROM AquaSafe.Users
        LEFT OUTER JOIN AquaSafe.WorksOn ON Users.Id = WorksOn.user
        WHERE Users.Email = ?`;
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

app.get('/api/dashboard/:id', async (req, res) => {
    const projectId = req.params.id;
    try {
        const [project] = await connection.promise().query('SELECT * FROM AquaSafe.Projects WHERE Id = ?', [projectId]);

        const [deployedDevices] = await connection.promise().query('SELECT * FROM AquaSafe.DeployedDevices WHERE Project = ?', [projectId]);


        let readings = [];
        let units = [];

        if (deployedDevices.length > 0) {
            const deviceIds = deployedDevices.map(device => device.Id);
            [readings] = await connection.promise().query('SELECT * FROM AquaSafe.Readings WHERE Device IN (?)', [deviceIds]);;

            if (readings.length > 0) {
                const unitIds = Array.from(new Set(readings.map(reading => reading.UnitId)));
                [units] = await connection.promise().query('SELECT * FROM AquaSafe.ParameterUnits WHERE Id IN (?)', [unitIds]);
            }
        }

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


app.get('/api/notifications', (req, res) => {
    const fetchNotificationsQuery = 'SELECT * FROM AquaSafe.Notifications ORDER BY Time DESC';
    connection.query(fetchNotificationsQuery, (err, results) => {
        if (err) {
            console.error('Error fetching notifications: ', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        // Transform the result to match the structure of your frontend
        const notifications = results.map(row => {
            return {
                id: row.Id,
                type: "sensor", // If the type is not available, it can be hardcoded or removed
                code: row.Priority === 'high' ? 10 : (row.Priority === 'low' ? 12 : 11), // Mapping priority to a suitable code
                location: row.Location,
                description: row.Description,
                device: row.Device,
                reading: row.Reading,
                status: row.Priority === 'high' ? "Urgent" : "Moderate", // You can adjust this according to your needs
                IsViewed: row.IsViewed,
                date: row.Time,
                user: row.User
            };
        });

        res.json(notifications);
    });
});

app.put('/api/notifications/view', (req, res) => {
    const { notificationIds } = req.body;
    if (!Array.isArray(notificationIds)) {
        return res.status(400).json({ message: 'Bad request. Expecting an array of notification IDs.' });
    }

    const updateQuery = `UPDATE AquaSafe.Notifications SET IsViewed = TRUE WHERE Id IN (${notificationIds.join(',')})`;

    connection.query(updateQuery, (err, results) => {
        if (err) {
            console.error('Error updating notifications: ', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        res.json({ message: 'Notifications updated successfully' });
    });
});

// Create route to retrieve a specific user by ID
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT Users.Id, FirstName, LastName, Email, Designation, Country, Name as Site FROM AquaSafe.Users JOIN AquaSafe.WorksOn ON Users.Id = WorksOn.user JOIN AquaSafe.Projects ON Projects.Id = WorksOn.project WHERE Users.Id = ?;', [id], (err, rows) => {
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
    connection.query('SELECT Users.Id, FirstName, LastName, Email, Designation, Country, Name as Site from AquaSafe.Users left outer join AquaSafe.WorksOn on Users.Id = WorksOn.user join Projects on Projects.Id = WorksOn.project;', (err, rows) => {
        if (err) throw err;

        res.send(rows);
    });
});

app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    // Update the user's data in the users table
    const updateUserQuery = 'UPDATE AquaSafe.Users SET FirstName = ?, LastName = ?, Email = ? WHERE Id = ?';
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
                const updatePasswordQuery = 'UPDATE AquaSafe.Users SET Password = ? WHERE Id = ?';
                connection.query(updatePasswordQuery, [hashedPassword, id], (err) => {
                    if (err) {
                        console.error('Error updating password: ', err);
                        res.status(500).json({ message: 'Internal server error.' });
                    } else {
                        // Fetch the projectId from Projects table
                        const fetchProjectIdQuery = 'SELECT Id FROM AquaSafe.Projects WHERE Name = ?';
                        connection.query(fetchProjectIdQuery, [updatedUser.Site], (err, result) => {
                            if (err || result.length === 0) {
                                console.error('Error fetching project id: ', err);
                                return res.status(500).json({ message: 'Internal server error.' });
                            }
                            const projectId = result[0].Id;

                            // Update the user's data in the workson table
                            const updateWorksonQuery = 'UPDATE AquaSafe.WorksOn SET Designation = ?, project = ? WHERE user = ?';
                            connection.query(updateWorksonQuery, [updatedUser.Designation, projectId, id], (err) => {
                                if (err) {
                                    console.error('Error updating workson: ', err);
                                    res.status(500).json({ message: 'Internal server error.' });
                                } else {
                                    res.status(200).json({ message: 'User updated successfully.' });
                                }
                            });
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
    const worksonQuery = `DELETE FROM AquaSafe.WorksOn WHERE user = ?`;

    // Execute workson SQL query
    connection.query(worksonQuery, [id], (error) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error deleting user assignments from MySQL' });
            return;
        }

        // Construct SQL query to delete user by ID
        const usersQuery = `DELETE FROM AquaSafe.Users WHERE Id = ?`;

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

// Create route to retrieve parameters data from database
app.get('/parameters', (req, res) => {
    connection.query('SELECT wp.Name, wp.Description, pu.Unit, pu.Min, pu.Max FROM AquaSafe.WaterParameters wp JOIN AquaSafe.ParameterUnits pu ON wp.Name = pu.ParameterName', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.post('/parameters', (req, res) => {
    const data = req.body;
    const query = `INSERT into AquaSafe.WaterParameters(Name, Description, Unit, Min, Max) VALUES('${data.ParameterName}', '${data.ParameterDescription}', '${data.ParameterUnit}', ${data.ParameterMin}, ${data.ParameterMax});`;
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
    connection.query('SELECT * FROM AquaSafe.Projects WHERE Id = ?', [projectId], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching project name');
        } else if (rows.length === 0) {
            res.status(404).send('Project not found');
        } else {
            res.status(200).json(rows[0]);
        }
    });
});

app.post('/projects', (req, res) => {
    const data = req.body;
    const query = `INSERT INTO AquaSafe.Projects (Name, Location, Country, Longitude, Latitude, Description) VALUES('${data.Name}', '${data.Location}', '${data.Country}', ${data.Longitude}, ${data.Latitude}, '${data.Description}');`;

    // Execute SQL query
    connection.query(query, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error inserting entry into MySQL' });
        } else {
            // Return the ID of the newly created entry
            const Id = result.insertId;
            res.status(200).json({ message: 'Entry inserted successfully into MySQL', Id });
        }
    });
});

app.put('/api/projects/:id', (req, res) => {

    const projectId = req.params.id;
    const updatedProject = req.body;
    connection.query(
        'UPDATE AquaSafe.Projects SET ? WHERE Id = ?',
        [updatedProject, projectId],
        (err, result) => {
            if (err) {
                console.error('Error updating project:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Project not found.' });
            }

            return res.status(200).json({ message: 'Project updated successfully.' });
        }
    );
});

app.delete('/api/project/:id', (req, res) => {
    const projectId = req.params.id;

    // Delete associated notifications first
    connection.query(
        'DELETE FROM AquaSafe.Notifications WHERE Device IN (SELECT Id FROM AquaSafe.DeployedDevices WHERE Project = ?)',
        [projectId],
        (err, result) => {
            if (err) {
                console.error('Error deleting associated notifications:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            // Delete associated readings
            connection.query(
                'DELETE FROM AquaSafe.Readings WHERE Device IN (SELECT Id FROM AquaSafe.DeployedDevices WHERE Project = ?)',
                [projectId],
                (err, result) => {
                    if (err) {
                        console.error('Error deleting associated readings:', err);
                        return res.status(500).json({ message: 'Internal server error.' });
                    }

                    // Delete associated devices
                    connection.query(
                        'DELETE FROM AquaSafe.DeployedDevices WHERE Project = ?',
                        [projectId],
                        (err, result) => {
                            if (err) {
                                console.error('Error deleting associated devices:', err);
                                return res.status(500).json({ message: 'Internal server error.' });
                            }

                            // Delete associated worksOn entries
                            connection.query(
                                'DELETE FROM AquaSafe.WorksOn WHERE project = ?',
                                [projectId],
                                (err, result) => {
                                    if (err) {
                                        console.error('Error deleting associated worksOn entries:', err);
                                        return res.status(500).json({ message: 'Internal server error.' });
                                    }

                                    // Delete the project itself
                                    connection.query(
                                        'DELETE FROM AquaSafe.Projects WHERE Id = ?',
                                        [projectId],
                                        (err, result) => {
                                            if (err) {
                                                console.error('Error deleting project:', err);
                                                return res.status(500).json({ message: 'Internal server error.' });
                                            }

                                            if (result.affectedRows === 0) {
                                                return res.status(404).json({ message: 'Project not found.' });
                                            }

                                            return res.status(200).json({ message: 'Project deleted successfully.' });
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});



app.get('/api/deployeddevices/:deviceId', (req, res) => {
    const deviceId = req.params.deviceId;
    const query = 'SELECT * FROM AquaSafe.DeployedDevices WHERE Id = ?';

    connection.query(query, [deviceId], (err, rows) => {
        if (err) {
            console.error('Error fetching deployed device: ', err);
            res.status(500).json({ message: 'Internal server error.' });
        } else {
            if (rows.length === 0) {
                res.status(404).json({ message: 'Device not found.' });
            } else {
                const device = rows[0];
                res.status(200).json(device);
            }
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
        INSERT INTO AquaSafe.DeployedDevices (Name, Longitude, Latitude, Frequency, Project, Locality, CommTech, StatusCode, Sensors)
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

app.put('/api/deployeddevices/:deviceId', (req, res) => {

    const deviceId = req.params.deviceId;
    const { Name, Longitude, Latitude, Frequency, Project, Locality, CommTech, StatusCode, Sensors } = req.body;

    // Validate user input (you can add more validation as per your requirements)
    if (!Name || !Project) {
        return res.status(400).json({ message: 'Please provide a device name and project ID.' });
    }

    // Update the deployed device in the deployeddevices table
    const updateDeviceQuery = `
        UPDATE AquaSafe.DeployedDevices
        SET Name = ?, Longitude = ?, Latitude = ?, Frequency = ?, Project = ?, Locality = ?, CommTech = ?, StatusCode = ?, Sensors = ?
        WHERE Id = ?
    `;
    connection.query(updateDeviceQuery, [Name, Longitude, Latitude, Frequency, Project, Locality, CommTech, StatusCode, Sensors, deviceId], (err, result) => {
        if (err) {
            console.error('Error updating deployed device: ', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Device not found.' });
        }

        return res.status(200).json({ message: 'Device updated successfully.' });
    });
});

app.delete('/api/deployeddevices/:deviceId', (req, res) => {
    const deviceId = req.params.deviceId;

    // Delete associated notifications first
    connection.query(
        'DELETE FROM AquaSafe.Notifications WHERE Device = ?',
        [deviceId],
        (err, result) => {
            if (err) {
                console.error('Error deleting associated notifications:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            // Delete associated readings
            connection.query(
                'DELETE FROM AquaSafe.Readings WHERE Device = ?',
                [deviceId],
                (err, result) => {
                    if (err) {
                        console.error('Error deleting associated readings:', err);
                        return res.status(500).json({ message: 'Internal server error.' });
                    }

                    // Delete the device itself
                    connection.query(
                        'DELETE FROM AquaSafe.DeployedDevices WHERE Id = ?',
                        [deviceId],
                        (err, result) => {
                            if (err) {
                                console.error('Error deleting device:', err);
                                return res.status(500).json({ message: 'Internal server error.' });
                            }

                            if (result.affectedRows === 0) {
                                return res.status(404).json({ message: 'Device not found.' });
                            }

                            return res.status(200).json({ message: 'Device deleted successfully.' });
                        }
                    );
                }
            );
        }
    );
});


// Create route to fetch readings from database
app.get('/api/readings', (req, res) => {
    const projectId = req.query.Id;
    const query = `
        SELECT r.Id, r.Time, r.Reading, dd.Name as DeviceName, r.Parameter, r.UnitId, wp.Description, pu.Unit, dd.Project, p.Name as ProjectName
        FROM AquaSafe.Readings r
        JOIN AquaSafe.DeployedDevices dd ON r.Device = dd.Id
        JOIN AquaSafe.Projects p ON dd.Project = p.Id
        JOIN AquaSafe.ParameterUnits pu ON r.UnitId = pu.Id
        JOIN AquaSafe.WaterParameters wp ON pu.ParameterName = wp.Name
        WHERE p.Id = ?;
    `;

    connection.query(query, [projectId], (err, rows) => {
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
    const query = `SELECT dd.Id, dd.Name, dd.Longitude, dd.Latitude, dd.Frequency, dd.Project, dd.StatusCode, dd.Sensors FROM AquaSafe.DeployedDevices dd JOIN AquaSafe.Projects p ON dd.Project = p.Id WHERE p.Name = ?`;
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

    connection.query('SELECT Id FROM AquaSafe.DeployedDevices WHERE Name = ?', [deviceName], async (deviceErr, deviceRows) => {
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
                    connection.query('SELECT Id FROM AquaSafe.ParameterUnits WHERE Unit = ? and ParameterName = ?', [unit, parameter], (unitErr, unitRows) => {
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


// Code for merging react static files with backend
const path = require('path')
const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "../my-app/build");
app.use(express.static(buildPath))
app.get("/*", function (req, res) {

    res.sendFile(
        path.join(__dirname, "../my-app/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    )
})
