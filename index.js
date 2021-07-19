const express = require('express');
const app = express();
const dotenv = require('dotenv');
var cors = require('cors')
const mongoose = require('mongoose');

const port = process.env.PORT || 8080;

app.use(cors())

//Import Routes
const authRoute = require('./routes/auth');
const contactsRoute = require('./routes/contacts')
dotenv.config();

app.listen(port, () => {
    console.log('Server is running [', port, ']')
});
//Connect to DB
require('./initDB')();

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', contactsRoute);