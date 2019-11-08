let express = require('express')
require('dotenv').config()

// init app
let app = express()
const PORT = process.env.PORT | 5000

// middleware
app.use(express.json())

// routes
let routes = require('./routes')
app.use('/api', routes)

// start server
let server = app.listen(PORT, () => {
    console.log(`Live at http://localhost:${PORT}`)
})

// sockets
let initSockets = require('./sockets')
initSockets(server)
