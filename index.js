const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000 

// middleware
app.use(cors())
app.use(express.json())




// started api for test this server

app.get('/', (req,res)=>{
    res.send("to do server started...")
})

app.listen(port, ()=>{
    console.log("this server running on: ",port)
})