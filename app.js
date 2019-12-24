

var express = require('express');
var todoController = require('./controllers/todoController');
//const connectDB = require('./controllers/db.js')

var app = express();

// connect to DB
//connectDB();

// set up template engine
app.set('view engine', 'ejs');

// static files with middleware
app.use(express.static('./public'));


// listen to port
const port = 5000;
app.listen(port, "127.0.0.1");
console.log(`Server listening on port ${port}...`);


// fire controller
todoController(app);