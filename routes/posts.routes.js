const express = require('express');
const router = express.Router();


const postsCtrl = require('../controllers/posts.controller');


router.post('/', postsCtrl.create);
// Retrieve all  Posts
router.get("/all", postsCtrl.findAll);

// Retrieve a single Post with id
router.get("/:id", postsCtrl.findById);

// Update a Post with id
router.put("/:id", postsCtrl.update);

// Delete a Post with id
router.delete("/:id", postsCtrl.delete);

/* // Delete all posts
router.delete("/", postsCtrl.deleteAll); */

module.exports = router;