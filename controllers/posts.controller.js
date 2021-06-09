const db = require("../models");
const Post = db.posts;

const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty"
        });
        return;
    }

    // Create a Tutorial
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    Post.create({
        title: tutorial.title,
        description: tutorial.description,
        published: tutorial.published ? tutorial.published : false
    }).then((post) => {
        //recup post ID
        console.log(`>> Created post ${JSON.stringify(post, null, 4)}`);
        res.send(post);
    }).catch((err) => {
        console.error(">> Error while creating post: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the post."
        })
    });
};