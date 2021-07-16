const db = require('../models');
//const Tutorial = db.tutorials;
const Comment = db.comments;

exports.create = (req, res) => {

    Comment.create({
        message: req.body.message,
        isAnswer: req.body.isAnswer ? req.body.isAnswer : false,
        answerTo: req.body.isAnswer ? req.body.answerTo : null,
        postId: req.body.postId,
        userId: req.userId,
    }).then((comment) => {
        console.log(`>> Created Comment ${JSON.stringify(comment, null, 4)}`);
        res.send(comment);
    }).catch((err) => {
        console.error(">> Error while creating comment: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the comment."
        })
    });
}

exports.findById = (req, res) => {
    const id = req.params.id;
    Comment.findByPk(id, { include: ["posts"] })
        .then((comment) => {

            res.send(comment);
            console.log(comment.dataValues.userId);
            return comment.dataValues.userId;
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
        });

};



exports.update = (req, res) => {
    const id = req.params.id;
    // ici on peut modifier tout profile tant qu'on a l'id ... Au front de le gérer ?
    // recupérer findbyid
    console.log(req.body)
    Comment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.send({
                    message: "Comment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Comment with id=" + id
            });
        });
};


// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + id
            });
        });
};