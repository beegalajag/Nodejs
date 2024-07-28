// server starts here


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('../todo-app/Todos');


const app = express();
const port = 3000;
//middleware
app.use(bodyParser.json());

//mongoDB connection
mongoose.connect('mongodb://localhost:27017');

const db =mongoose.connection;

db.on('error', (error) => console.error(error));

db.once('open', () => console.log('conncected to mongoDB'));

//Routes
app.use('/Todos',todoRoutes);

//start the server

app.listen(port, () => {console.log(`server running on http://localhost: ${port}`)});

