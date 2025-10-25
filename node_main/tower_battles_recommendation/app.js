const express = require('express')
require('dotenv').config({ path: '.env' })
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');

const connectDB = require('./db/connect.js')
const notFoundMiddleware = require('./middleware/not_found.js')
const errorHandlerMiddleware = require('./middleware/error_handler.js')
const towers = require('./routes/towers.js')
const accounts = require('./routes/accounts.js');  

const app = express()

// middleware
app.use(express.json())
app.use(cors(corsOptions));

// routes
app.use('/api/v1/towers', towers)
app.use('/api/v1/accounts', accounts);

// errors handling
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()