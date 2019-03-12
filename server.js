const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require("./api/models/todoModel");
let routes = require("./api/routes/todoRoutes");

// initialize our express app
const app = express();
const port = process.env.PORT || 2000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:2001/todo"); // connect to MongoDB

// handle incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); // register our routes

// middleware to handle wrong routes
app.use( (req, res) => {
    res.status(404).send({ url: req.originalUrl + 'not found' });
});

// get our server running
app.listen(port, () => {
    console.log("App up and running on " + port);
});
