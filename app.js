const express = require('express');
const postsRoutes = require('./routes/posts.routes');
const path = require('path');

const app = express();

var helmet = require('helmet');


app.use(helmet());

const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
    //run();
    console.log("Drop and re-sync db.");

});

//app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Groupamania application." });
});

app.use('/api/posts', postsRoutes);



module.exports = app;