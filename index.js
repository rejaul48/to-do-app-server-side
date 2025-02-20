const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors(
    {
        origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
        credentials: true
    }
))
app.use(express.json())


// mongoDb server connection and api



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.TO_DO_USER_NAME}:${process.env.TO_DO_PASS}@cluster0.ho6hi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // create a database and database collection
        const db = client.db('taskManagmentDB')
        const tasksCollection = db.collection('tasksCollection')


        // get all task api
        app.get('/tasks', async (req, res) => {
            try {
                const result = await tasksCollection.find().toArray()
                res.send(result)
            }
            catch (err) {
                res.status(500).send({ error: 'Failed to get task' });
            }
        })

        // task post api
        app.post('/tasks', async (req, res) => {
            const task = req.body;

            try {
                const result = await tasksCollection.insertOne(task)
                res.send(result)
            } catch (err) {
                res.status(500).send({ error: 'Failed to add task' });
            }
        })



        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // error control here

    }
}
run().catch(console.dir);


// mongoDb server connection and api



// started api for test this server

app.get('/', (req, res) => {
    res.send("to do server started...")
})

app.listen(port, () => {
    console.log("this server running on: ", port)
})