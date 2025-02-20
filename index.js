
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true,
}));
app.use(express.json());

// MongoDB connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // Get all tasks
        app.get('/tasks', async (req, res) => {
            try {
                const result = await tasksCollection.find().toArray();
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to get tasks' });
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

        // Add a new task
        app.post('/tasks', async (req, res) => {
            const task = req.body;
            try {
                const result = await tasksCollection.insertOne(task);
                res.send(result);
            } catch (err) {
                res.status(500).send({ error: 'Failed to add task' });
            }
        });

        // Update task
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

        // Update task position and category
        // Update task position and category
       
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
                    res.send({ success: true, message: 'Task position updated successfully' });
                } else {
                    res.status(404).send({ error: 'Task not found or no changes made' });
                }
            } catch (err) {
                console.error('Error updating task position:', err);
                res.status(500).send({ error: 'Failed to update task position' });
            }
        });


        // Delete task
        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await tasksCollection.deleteOne(query);
            res.send(result);
        });

        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        // Handle errors here
    }
}

run().catch(console.dir);

// Start the server
app.get('/', (req, res) => {
    res.send('To-do server started...');
});

app.listen(port, () => {
    console.log('Server running on port:', port);
});

