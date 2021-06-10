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

    // Create a Post
    const post = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        // postedAt: req.body.postedAt ? req.body.postedAt : false
    };

    // Save Post in the database
    Post.create({
        title: post.title,
        imageUrl: post.imageUrl,
        //  postedAt: post.postedAt ? post.postedAt : false
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