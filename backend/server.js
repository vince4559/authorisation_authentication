require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentails');
const PORT = process.env.PORT || 3500;
const errorHandler = require('./middlewares/errorHanler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbconnect');
const userRoute = require('./routes/userRoute');
const employeeRouter = require('./routes/employeeRoute');

// connect to mongoDB
connectDB();

// handle options credentail check before cors and fetch cookies credentials requirement
app.use(credentials);

// cross origin resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded from data
app.use(express.urlencoded({extended:false}));

// built-in middleware fro json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes

app.get('/', (req, res) => {
    res.send('Welcome TO Backend')
});

app.use('/auth',userRoute );

// route that needs to be verified with  jwt token
app.use(verifyJWT);
app.use('/api', employeeRouter);


app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})







