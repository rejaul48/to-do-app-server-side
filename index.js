
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//     origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
//     credentials: true,
// }));
// app.use(express.json());

// // MongoDB connection
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.TO_DO_USER_NAME}:${process.env.TO_DO_PASS}@cluster0.ho6hi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// });

// async function run() {
//     try {
//         const db = client.db('taskManagmentDB');
//         const tasksCollection = db.collection('tasksCollection');
//         // register people collection
//         const registerPeopleCollection = db.collection('registerPeopleCollection')

//         // Get all tasks
//         app.get('/tasks', async (req, res) => {
//             try {
//                 const result = await tasksCollection.find().toArray();
//                 res.send(result);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to get tasks' });
//             }
//         });

//         // get all register task
//         app.get('/register-people', async (req, res) => {
//             try {
//                 const result = await registerPeopleCollection.find().toArray();
//                 res.send(result)
//             }
//             catch (err) {
//                 res.status(500).send({ error: 'Failed to get register people' });
//             }
//         })

//         app.get('/register-people/:email', async (req, res) => {
//             const email = req.params.email;
//             try {
//                 const query = { email: email };
//                 const result = await registerPeopleCollection.find(query).toArray();

//                 if (!result.length) {
//                     return res.status(404).send({ error: 'No registered people found for this email' });
//                 }

//                 res.send(result);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to get register people' });
//             }
//         });

//         // Get task by ID
//         app.get('/tasks/:id', async (req, res) => {
//             const id = req.params.id;
//             try {
//                 const query = { _id: new ObjectId(id) };
//                 const task = await tasksCollection.findOne(query);
//                 if (!task) {
//                     return res.status(404).send({ error: 'Task not found' });
//                 }
//                 res.send(task);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to fetch task' });
//             }
//         });
//         // get all data by email
//         app.get('/tasks/email/:email', async (req, res) => {
//             const email = req.params.email;
//             try {
//                 const query = { email: email };  
//                 const tasks = await tasksCollection.find(query).toArray();  
//                 if (!tasks.length) {
//                     return res.status(404).send({ error: 'No tasks found for this email' });
//                 }
//                 res.send(tasks);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to fetch tasks' });
//             }
//         });


//         // Add a new task
//         app.post('/tasks', async (req, res) => {
//             const task = req.body;
//             try {
//                 const result = await tasksCollection.insertOne(task);
//                 res.send(result);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to add task' });
//             }
//         });

//         // register people 
//         app.post('/register-people', async (req, res) => {
//             const registerPeople = req.body;
//             try {
//                 const result = await registerPeopleCollection.insertOne(registerPeople)
//                 res.send(result)
//             } catch (err) {
//                 res.status(500).send({ error: 'faild to added people' });
//             }
//         })

//         // Update task
//         app.put('/tasks/:id', async (req, res) => {
//             const id = req.params.id;
//             const filter = { _id: new ObjectId(id) };
//             const option = { upsert: true };
//             const updateTask = req.body;

//             const update = {
//                 $set: {
//                     title: updateTask.title,
//                     description: updateTask.description,
//                     category: updateTask.category,
//                     setTime: updateTask.setTime,
//                     submittedTime: updateTask.submittedTime,
//                 },
//             };

//             try {
//                 const result = await tasksCollection.updateOne(filter, update, option);
//                 if (result.modifiedCount > 0) {
//                     res.send(result);
//                 } else {
//                     res.status(500).send({ error: 'Failed to update task' });
//                 }
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to update task' });
//             }
//         });

//         // Update task position and category

//         app.put('/tasks/updatePosition/:id', async (req, res) => {
//             const id = req.params.id;
//             const { category, position } = req.body;

//             try {
//                 const filter = { _id: new ObjectId(id) };
//                 const update = {
//                     $set: {
//                         category: category, // Update the category
//                         position: position, // Update the position
//                     },
//                 };

//                 // Update the task in the database with the correct category and position
//                 const result = await tasksCollection.updateOne(filter, update);

//                 if (result.modifiedCount > 0) {
//                     res.send({ success: true, message: 'Task position updated successfully' });
//                 } else {
//                     res.status(404).send({ error: 'Task not found or no changes made' });
//                 }
//             } catch (err) {
//                 console.error('Error updating task position:', err);
//                 res.status(500).send({ error: 'Failed to update task position' });
//             }
//         });





//         // Delete task
//         app.delete('/tasks/:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await tasksCollection.deleteOne(query);
//             res.send(result);
//         });

//         console.log('Pinged your deployment. You successfully connected to MongoDB!');
//     } finally {
//         // Handle errors here
//     }
// }

// run().catch(console.dir);

// // Start the server
// app.get('/', (req, res) => {
//     res.send('To-do server started...');
// });

// app.listen(port, () => {
//     console.log('Server running on port:', port);
// });




// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const http = require('http');
// const WebSocket = require('ws');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// const app = express();
// const port = process.env.PORT || 5000;
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// // Middleware
// app.use(cors({
//     origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
//     credentials: true,
// }));
// app.use(express.json());

// // MongoDB connection
// const uri = `mongodb+srv://${process.env.TO_DO_USER_NAME}:${process.env.TO_DO_PASS}@cluster0.ho6hi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// });

// async function run() {
//     try {
//         const db = client.db('taskManagmentDB');
//         const tasksCollection = db.collection('tasksCollection');
//         const registerPeopleCollection = db.collection('registerPeopleCollection');

//         // Function to send real-time updates to all connected clients
//         function broadcast(data) {
//             wss.clients.forEach(client => {
//                 if (client.readyState === WebSocket.OPEN) {
//                     client.send(JSON.stringify(data));
//                 }
//             });
//         }

//         // WebSocket connection
//         wss.on('connection', (ws) => {
//             console.log("WebSocket connected.");

//             // Send initial task list on connection
//             tasksCollection.find().toArray().then(tasks => {
//                 ws.send(JSON.stringify({ type: 'initialData', tasks }));
//             }).catch(err => console.error('Error fetching initial data:', err));
//         });

//         // Get all tasks
//         app.get('/tasks', async (req, res) => {
//             try {
//                 const result = await tasksCollection.find().toArray();
//                 res.send(result);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to get tasks' });
//             }
//         });

//         // Get all registered people
//         app.get('/register-people', async (req, res) => {
//             try {
//                 const result = await registerPeopleCollection.find().toArray();
//                 res.send(result);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to get registered people' });
//             }
//         });

//         app.get('/register-people/:email', async (req, res) => {
//             const email = req.params.email;
//             try {
//                 const query = { email: email };
//                 const result = await registerPeopleCollection.find(query).toArray();

//                 if (!result.length) {
//                     return res.status(404).send({ error: 'No registered people found for this email' });
//                 }

//                 res.send(result);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to get register people' });
//             }
//         });

//         //         // Get task by ID
//         app.get('/tasks/:id', async (req, res) => {
//             const id = req.params.id;
//             try {
//                 const query = { _id: new ObjectId(id) };
//                 const task = await tasksCollection.findOne(query);
//                 if (!task) {
//                     return res.status(404).send({ error: 'Task not found' });
//                 }
//                 res.send(task);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to fetch task' });
//             }
//         });

//         //         // get all data by email
//         app.get('/tasks/email/:email', async (req, res) => {
//             const email = req.params.email;
//             try {
//                 const query = { email: email };
//                 const tasks = await tasksCollection.find(query).toArray();
//                 if (!tasks.length) {
//                     return res.status(404).send({ error: 'No tasks found for this email' });
//                 }
//                 res.send(tasks);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to fetch tasks' });
//             }
//         });


//         // Add a new task
//         app.post('/tasks', async (req, res) => {
//             const task = req.body;
//             try {
//                 const result = await tasksCollection.insertOne(task);
//                 if (result.acknowledged) {
//                     task._id = result.insertedId;
//                     broadcast({ type: 'newTask', task });
//                 }
//                 res.send(result);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to add task' });
//             }
//         });

//         // register people 
//         app.post('/register-people', async (req, res) => {
//             const registerPeople = req.body;
//             try {
//                 const result = await registerPeopleCollection.insertOne(registerPeople)
//                 res.send(result)
//             } catch (err) {
//                 res.status(500).send({ error: 'faild to added people' });
//             }
//         })

//         // Update task (category & position for drag-and-drop)
//         app.put('/tasks/updatePosition/:id', async (req, res) => {
//             const id = req.params.id;
//             const { category, position } = req.body;

//             try {
//                 const filter = { _id: new ObjectId(id) };
//                 const update = {
//                     $set: {
//                         category: category,
//                         position: position,
//                     },
//                 };

//                 const result = await tasksCollection.updateOne(filter, update);
//                 if (result.modifiedCount > 0) {
//                     const updatedTask = await tasksCollection.findOne(filter);  // Get full updated task
//                     broadcast({ type: 'taskUpdated', task: updatedTask }); // Send full updated task
//                     res.send({ success: true, message: 'Task position updated successfully', task: updatedTask });
//                 } else {
//                     res.status(404).send({ error: 'Task not found or no changes made' });
//                 }
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to update task position' });
//             }
//         });


//         // Delete a task
//         app.delete('/tasks/:id', async (req, res) => {
//             const id = req.params.id;
//             try {
//                 const query = { _id: new ObjectId(id) };
//                 const result = await tasksCollection.deleteOne(query);
//                 if (result.deletedCount > 0) {
//                     broadcast({ type: 'taskDeleted', taskId: id });
//                 }
//                 res.send(result);
//             } catch (err) {
//                 res.status(500).send({ error: 'Failed to delete task' });
//             }
//         });

//         console.log('Connected to MongoDB!');
//     } finally {
//         // Keep the connection open
//     }
// }

// run().catch(console.dir);

// // Start the server
// server.listen(port, () => {
//     console.log(`Server running on port: ${port}`);
// });



const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const WebSocket = require('ws');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true,
}));
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.TO_DO_USER_NAME}:${process.env.TO_DO_PASS}@cluster0.ho6hi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        const db = client.db('taskManagmentDB');
        const tasksCollection = db.collection('tasksCollection');
        const registerPeopleCollection = db.collection('registerPeopleCollection');

        // Function to send real-time updates to all connected clients
        function broadcast(data) {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        }

        // WebSocket connection
        wss.on('connection', (ws) => {
            console.log("WebSocket connected.");

            // Send initial task list on connection
            tasksCollection.find().toArray().then(tasks => {
                ws.send(JSON.stringify({ type: 'initialData', tasks }));
            }).catch(err => console.error('Error fetching initial data:', err));
        });

        // Get all tasks
        app.get('/tasks', async (req, res) => {
            try {
                const result = await tasksCollection.find().toArray();
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to get tasks' });
            }
        });

        // Get all registered people
        app.get('/register-people', async (req, res) => {
            try {
                const result = await registerPeopleCollection.find().toArray();
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to get registered people' });
            }
        });

        // Get registered people by email
        app.get('/register-people/:email', async (req, res) => {
            const email = req.params.email;
            try {
                const query = { email: email };
                const result = await registerPeopleCollection.find(query).toArray();

                if (!result.length) {
                    return res.status(404).send({ error: 'No registered people found for this email' });
                }

                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to get register people' });
            }
        });

        // Get task by ID
        app.get('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const query = { _id: new ObjectId(id) };
                const task = await tasksCollection.findOne(query);
                if (!task) {
                    return res.status(404).send({ error: 'Task not found' });
                }
                res.send(task);
            } catch (err) {
                res.status(500).send({ error: 'Failed to fetch task' });
            }
        });

        // Get all tasks by email
        app.get('/tasks/email/:email', async (req, res) => {
            const email = req.params.email;
            try {
                const query = { email: email };
                const tasks = await tasksCollection.find(query).toArray();
                if (!tasks.length) {
                    return res.status(404).send({ error: 'No tasks found for this email' });
                }
                res.send(tasks);
            } catch (err) {
                res.status(500).send({ error: 'Failed to fetch tasks' });
            }
        });

        // Add a new task
        app.post('/tasks', async (req, res) => {
            const task = req.body;
            try {
                const result = await tasksCollection.insertOne(task);
                if (result.acknowledged) {
                    task._id = result.insertedId;
                    broadcast({ type: 'newTask', task });
                }
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to add task' });
            }
        });

        // Register people
        app.post('/register-people', async (req, res) => {
            const registerPeople = req.body;
            try {
                const result = await registerPeopleCollection.insertOne(registerPeople);
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to add people' });
            }
        });

        // update task
        app.put('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const option = { upsert: true };
            const updateTask = req.body;

            const update = {
                $set: {
                    title: updateTask.title,
                    description: updateTask.description,
                    category: updateTask.category,
                    setTime: updateTask.setTime,
                    submittedTime: updateTask.submittedTime,
                },
            };

            try {
                const result = await tasksCollection.updateOne(filter, update, option);
                if (result.modifiedCount > 0) {
                    res.send(result);
                } else {
                    res.status(500).send({ error: 'Failed to update task' });
                }
            } catch (err) {
                res.status(500).send({ error: 'Failed to update task' });
            }
        });

        // Update task (category & position for drag-and-drop)
        app.put('/tasks/updatePosition/:id', async (req, res) => {
            const id = req.params.id;
            const { category, position } = req.body;

            try {
                const filter = { _id: new ObjectId(id) };
                const update = {
                    $set: {
                        category: category,
                        position: position,
                    },
                };

                const result = await tasksCollection.updateOne(filter, update);
                if (result.modifiedCount > 0) {
                    const updatedTask = await tasksCollection.findOne(filter);
                    broadcast({ type: 'taskUpdated', taskId: id, task: updatedTask });
                    res.send({ success: true, message: 'Task position updated successfully' });
                } else {
                    res.status(404).send({ error: 'Task not found or no changes made' });
                }
            } catch (err) {
                res.status(500).send({ error: 'Failed to update task position' });
            }
        });

        // Update task position within the same category
        // PUT route for updating position within the same category
        app.put('/tasks/updatePositionWithinCategory/:id', async (req, res) => {
            const id = req.params.id;
            const { category, newPosition } = req.body;

            try {
                const filter = { _id: new ObjectId(id) };
                const update = {
                    $set: {
                        position: newPosition, // Update only the position
                    },
                };

                const result = await tasksCollection.updateOne(filter, update);
                if (result.modifiedCount > 0) {
                    const updatedTask = await tasksCollection.findOne(filter);
                    broadcast({ type: 'taskUpdated', taskId: id, task: updatedTask });
                    res.send({ success: true, message: 'Task position updated successfully' });
                } else {
                    res.status(404).send({ error: 'Task not found or no changes made' });
                }
            } catch (err) {
                res.status(500).send({ error: 'Failed to update task position within category' });
            }
        });

        // Delete a task
        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const query = { _id: new ObjectId(id) };
                const result = await tasksCollection.deleteOne(query);
                if (result.deletedCount > 0) {
                    broadcast({ type: 'taskDeleted', taskId: id });
                }
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to delete task' });
            }
        });

        console.log('Connected to MongoDB!');
    } finally {
        // Keep the connection open
    }
}

run().catch(console.dir);

// Start the server
server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});