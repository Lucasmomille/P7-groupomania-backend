const express = require('express');
const router = express.Router();


const postsCtrl = require('../controllers/posts.controller');


router.post('/', postsCtrl.create);

module.exports = router;