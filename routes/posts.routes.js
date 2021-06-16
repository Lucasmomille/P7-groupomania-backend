const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer.config');
const { auth } = require("../middlewares");
const postsCtrl = require('../controllers/posts.controller');

//rajouter multer après auth

router.post('/', auth.verifyToken, postsCtrl.create);
// Retrieve all  Posts
router.get("/all", auth.verifyToken, postsCtrl.findAll);

// Retrieve a single Post with id
router.get("/:id", auth.verifyToken, postsCtrl.findById);

// Update a Post with id
router.put("/:id", auth.verifyToken, postsCtrl.update);

// Delete a Post with id
router.delete("/:id", auth.verifyToken, postsCtrl.delete);

/* // Delete all posts
router.delete("/", postsCtrl.deleteAll); */

module.exports = router;