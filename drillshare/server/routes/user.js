import { verifyToken} from "../middlewares/authJwt.js";
import { allAccess, userBoard } from "../controllers/UserController.js";

export default function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/all", allAccess);
    app.get("/api/test/user", [verifyToken], userBoard);
};