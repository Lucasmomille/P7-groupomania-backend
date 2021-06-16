const db = require("../models");
const Post = db.posts;
const Comment = db.comments;
const Likes = db.likes;
const fs = require('fs');

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
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        // postedAt: req.body.postedAt ? req.body.postedAt : false
    };

    // Save Post in the database
    Post.create({
        title: post.title,
        imageUrl: post.imageUrl,
        likes: post.likes,

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


// Retrieve all Post from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({
        where: condition,
        include: [
            {
                model: Comment,
                as: "comments"
            },
            {
                model: Likes,
                as: "user_like",
                attributes: ["id"],
                through: {
                    attributes: [],
                },
            }
        ],
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving posts."
            });
        });
};

// Find a single Post with an id
exports.findById = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id, {
        include: [
            {
                model: Comment,
                as: "comments",
            },
            {
                model: Likes,
                as: "user_like",
                attributes: ["id"],
                through: {
                    attributes: [],
                }
            }
        ]
    })
        .then((post) => {
            res.send(post);
        })
        .catch((err) => {
            console.log(">> Error while finding post: ", err);
        });
};


// Update a Post by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    /* const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; */

    Post.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};


// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    /* Post.findByPk(id, {
        include: [
            {
                model: Comment,
                as: "comments",
            },
            {
                model: Likes,
                as: "user_like",
                attributes: ["id"],
                through: {
                    attributes: [],
                }
            }
        ]
    })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { */
    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
    /* })
        .catch(error => res.status(500).json({ error }));
}) */
};