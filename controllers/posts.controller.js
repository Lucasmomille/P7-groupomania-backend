const db = require("../models");
const Post = db.posts;
const Comment = db.comments;
const Likes = db.likes;
const User = db.users;
const fs = require('fs');


const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    console.log(req.body.title);
    console.log(req.file)
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty"
        });
        return;
    }

    // Create a Post
    const post = {
        title: req.body.title,
        //imageUrl: req.body.imageUrl,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.userId,

    };

    // Save Post in the database
    Post.create({
        title: post.title,
        imageUrl: post.imageUrl,

        userId: post.userId

    }).then((post) => {
        //recup post ID
        // console.log(req.file);
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
    //const title = req.query.title;
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({
        //  where: condition,
        include: [
            {
                model: Comment,
                as: "comments",
                include: [
                    {
                        model: User,
                        as: "users",
                    }
                ]


            },
            {
                model: User,
                as: "users",

            },
            {
                model: Likes,
                as: "likes"
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
    const reqPost = req.body.post

    if (req.file) {
        Post.findByPk(id, {
            include: [
                {
                    model: Comment,
                    as: "comments",
                }
            ]
        })
            .then(post => {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    console.log("unlink")
                })
            })
    }

    const postObject = req.file ?
        {
            reqPost,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    Post.update(postObject, {
        where: { id: id }
    }/* , { ...postObject, id: id } */)
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
    // console.log(res)
};


// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id, {
        include: [
            {
                model: Comment,
                as: "comments",
            }
        ]
    })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({
                    where: { id: id }
                })
                    /* .then(() => { 
                
                    }) */
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
            })
        });
};


// create like

exports.likePost = (req, res) => {
    let postId = req.body.postId;
    let userId = req.userId;
    //let like = req.body.like;
    //const id = req.body.likeId || null;

    Post.findByPk(postId, {
        include: [
            {
                model: Likes,
                as: "likes",
            }
        ]
    }).then(response => {

        let likes = response.dataValues.likes;

        for (const like of likes) {
            console.log(like.userId)
            if (like.userId !== userId) {
                console.log("userId is here")
                const condition1 = { id: like.id };
                const condition2 = { userId: req.userId };
                const condition3 = { postId: postId }
                Likes.destroy({
                    where: { ...condition1 }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Likes was deleted successfully!"
                            });
                        } else {
                            res.send({
                                message: `Cannot delete Likes with id=${id}. Maybe Likes was not found!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Could not delete Likes with id=" + id
                        });
                    });
                return
            } else {
                console.log("userId isn't")

                //console.log([...likes])
                //if()
                /* Likes.create({
                    postId: postId,
                    userId: userId,
                }).then((post) => {
                    //recup post ID
                    // console.log(req.file);
                    console.log(`>> Created post ${JSON.stringify(post, null, 4)}`);
                    res.send(post);
                }).catch((err) => {
                    console.error(">> Error while creating post: ", err);
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the post."
                    })
                });
                return */
            }
        }

    }
    ).catch(err => {
        res.status(500).send({
            message: "Could not delete Likes with id"
        });
    });

    /* if (id) {
        const condition1 = { id: id };
        const condition2 = { userId: req.userId };
        const condition3 = { postId: req.body.postId }
        Likes.destroy({
            where: { ...condition1, ...condition2, ...condition3 }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Likes was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Likes with id=${id}. Maybe Likes was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Likes with id=" + id
                });
            });
    } else {
        Likes.create({
            postId: postId,
            userId: userId,
        }).then((post) => {
            //recup post ID
            // console.log(req.file);
            console.log(`>> Created post ${JSON.stringify(post, null, 4)}`);
            res.send(post);
        }).catch((err) => {
            console.error(">> Error while creating post: ", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the post."
            })
        });
    } */

}

exports.createLike = (req, res) => {
    console.log(req.body)
    Likes.create({
        postId: req.body.postId,
        userId: req.userId,
    }).then((post) => {
        //recup post ID
        // console.log(req.file);
        console.log(`>> Created post ${JSON.stringify(post, null, 4)}`);
        res.send(post);
    }).catch((err) => {
        console.error(">> Error while creating post: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the post."
        })
    });
}

// delete likes

exports.deleteLikes = (req, res) => {
    const id = req.params.id;
    const condition1 = { id: id };
    const condition2 = { userId: req.userId };
    const condition3 = { postId: req.body.postId }
    Likes.destroy({
        where: { ...condition1, ...condition2, ...condition3 }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Likes was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Likes with id=${id}. Maybe Likes was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Likes with id=" + id
            });
        });
};



/* })
    .catch(error => res.status(500).json({ error }));
}) */


/* if (like === 1) {
        Likes.create({
            postId: postId,
            userId: userId,
        }).then((post) => {
            //recup post ID
            // console.log(req.file);
            console.log(`>> Created post ${JSON.stringify(post, null, 4)}`);
            res.send(post);
        }).catch((err) => {
            console.error(">> Error while creating post: ", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the post."
            })
        });
    } else {
        const condition1 = { id: id };
        const condition2 = { userId: req.userId };
        const condition3 = { postId: req.body.postId }
        Likes.destroy({
            where: { ...condition1, ...condition2, ...condition3 }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Likes was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Likes with id=${id}. Maybe Likes was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Likes with id=" + id
                });
            });
    } */