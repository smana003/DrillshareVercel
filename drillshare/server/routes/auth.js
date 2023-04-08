import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignUp";
import { signup, signin } from "../controllers/auth";
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [
            checkDuplicateUsernameOrEmail
        ],
        signup
    );
    app.post("/api/auth/signin", signin);
};