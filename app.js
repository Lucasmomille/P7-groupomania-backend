const express = require('express');
const rateLimit = require("express-rate-limit");
const postsRoutes = require('./routes/posts.routes');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const commentsRoutes = require('./routes/comments.routes');
const path = require('path');

const app = express();

var helmet = require('helmet');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

app.use(helmet());



const db = require("./models");
const Role = db.role;
db.sequelize.sync(/* { force: true } */).then(() => {
    console.log("Drop and re-sync db.");
    //initial();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Groupamania application." });
});

app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentsRoutes);




module.exports = app;