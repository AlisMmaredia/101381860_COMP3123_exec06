const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');  // Make sure to place this in the correct path

const DB_URL = "mongodb+srv://Alismaredia:Alis32018@cluster0.0ffxopg.mongodb.net/test"

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;


mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the MongoDb Atlas database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Use your imported routes as middleware for the '/notes' path
app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application</h1>");
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});