const express = require('express');
const router = express.Router();

const { auth } = require("../middlewares");
const controller = require("../controllers/users.controller");

router.get("/all", controller.allAccess);
router.get("/user", auth.verifyToken, controller.userBoard);
router.get("/mod", auth.verifyToken, auth.isModerator, controller.moderatorBoard);
router.get("/admin", auth.verifyToken, auth.isAdmin, controller.adminBoard);

router.put("/", auth.verifyToken, controller.update)
router.get("/", auth.verifyToken, controller.findById)
//router.delete("/admin", auth.verifyToken, auth.isAdmin, controller.delete);
//router.delete("/admin/:id", auth.verifyToken, controller.delete);
// admin delete users
module.exports = router;
