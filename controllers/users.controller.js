const db = require("../models");
const User = db.users;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

// Update a User by the id in the request
exports.update = (req, res) => {
    //const id = req.params.id;
    console.log("body ", req.body);
    const id = req.userId;
    // ici on peut modifier tout profile tant qu'on a l'id ... Au front de le gérer ?
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// get req.userId
exports.findById = (req, res) => {
    const id = req.userId;

    User.findByPk(id)
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            console.log(">> Error while finding user: ", err);
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.userId;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Users was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Users with id=" + id
            });
        });
};