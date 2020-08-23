const express = require('express');
const bodyParser = require('body-parser');

// Create app with express
const app = express();

//parse request of content type application (urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

//parse request of json content type application
app.use(bodyParser.json());


//configuring the database
const dbConfig = require('./config/database.config');
const mongoose  = require('mongoose');
const { db } = require('../node-easy-notes-app/app/models/note.model');

mongoose.Promise = global.Promise;

//connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully Connected to the database');
}).catch(err => {
    console.log("Could not connect to the database.", err);
    process.exit();
});


//defining a home route
app.get('/', (req, res) =>{
    res.json({"message": "Welcome to my phonebook."})
});



// Require Contacts routes
require('./app/routes/contact.routes')(app);



//fixing the port
const PORT = process.env.PORT || 5000;

// Listening the port
app.listen(PORT, ()=> {
    console.log(`Server is running at port ${PORT}`);
});