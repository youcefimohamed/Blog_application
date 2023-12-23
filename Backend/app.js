const express = require('express')
const connectDB = require("./config/connectToDb")
const { errorHandler, notFound } = require('./middlewares/error')
const cors = require("cors");
require('dotenv').config()



// connection to DB
connectDB()

// init  APP
const app = express()

//Middelewares
app.use(express.json())

// cors Policy
app.use(cors({
   origin: "http://localhost:3000", // allow to server to accept request from different origin
}))
// routes
app.use('/api/auth',require('./Routes/authRoute'))
app.use('/api/users',require('./Routes/usersRoute'))
app.use('/api/posts',require('./Routes/postRoute'))
app.use('/api/comments',require('./Routes/commentRoute'))
app.use('/api/categories',require('./Routes/categoryRoute'))
app.use('/api/password',require('./Routes/passwordRoute'))

// not found Error
app.use(notFound)
// error handler Middelewares
app.use(errorHandler)
//running server
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}` );})