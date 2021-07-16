

const express = require('express');
const router = express.Router();
const { auth } = require("../middlewares");
const comments = require("../controllers/comments.controller.js");

router.post("/", auth.verifyToken, comments.create);

// Retrieve a single comment with id
router.get("/:id", auth.verifyToken, comments.findById);

router.put("/:id", auth.verifyToken, comments.update);

router.delete("/:id", auth.verifyToken, comments.delete);

module.exports = router;