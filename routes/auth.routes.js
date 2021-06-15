const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");


router.post("/signin", controller.signin);

router.post(
    "/signup",
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    controller.signup
);
/* module.exports = function (app) {

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

   
}; */
module.exports = router;