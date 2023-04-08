import User from '../model/User.js';

export const checkDuplicateUsernameOrEmail = (req, res, next) => {

    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Creation failed. Username is already in use." });
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "Creation failed. Email is already in use." });
                return;
            }
            next();
        });
    });
};