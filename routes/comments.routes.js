

const express = require('express');
const router = express.Router();

const comments = require("../controllers/comments.controller.js");
router.post("/", comments.create);

// Retrieve a single comment with id
router.get("/:id", comments.findById);

router.put("/:id", comments.update);

router.delete("/:id", comments.delete);

module.exports = router;