import User from '../model/User.js';
import Profile from '../model/Profile.js';
import Payment from '../model/Payment.js';

const config = require('../config/auth.config.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// import { createProfile } from "../controllers/ProfileController";

export const signup = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  if (req.body.firstName === '' || req.body.lastName === '' || req.body.username === ''
    || req.body.email === '' || req.body.password === '') {
    res.send('ERROR');
    return;
  } else {
    user.save((err, user) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }
      user.save(err => {
        if (err) {
          res.status(500).send({message: err});
          return;
        }

        const profile = new Profile({
          userId: user._id,
          nameFirst: req.body.firstName,
          nameLast: req.body.lastName,
          email: req.body.email,
          phone: '',
          driversLicence: '',
          address: '',
          dob: '',
        });

        profile.save();

        const payment = new Payment({
          userID: user._id,
          cardNumber: null,
          expDate: null,
          authCode: null,
          creditcardType: null,
        });

        payment.save();

        res.send({user: user, message: 'User was registered successfully!'});
      });

    });
  }


};

export const signin = async (req, res) => {
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    return res.status(404).send({message: 'User Not found.'});
  }
  Profile.findOne({
    userId: user._id,
  }).exec((err, profile) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }
    var token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: 86400,
    });
    if (profile.driversLicence && profile.address) {
      Payment.findOne({
        userId: user._id,
      }).exec((err, payment) => {
        if (payment.cardNumber) {
          return res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
            profile: profile,
            profileValid: true,
          });
        }
      });

    } else {
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
        profile: profile,
        profileValid: false,
      });
    }
  });

};


// export const signin = (req, res) => {
//     // console.log(req.body);
//     User.findOne({
//         username: req.body.username
//     })
//         .exec((err, user) => {
//             if (err) {
//                 res.status(500).send({ message: err });
//                 return;
//             }
//             if (!user) {
//                 return res.status(404).send({ message: "User Not found." });
//             }
//             var passwordIsValid = bcrypt.compareSync(
//                 req.body.password,
//                 user.password
//             );
//             if (!passwordIsValid) {
//                 return res.status(401).send({
//                     accessToken: null,
//                     message: "Invalid Password!"
//                 });
//             }
//             var token = jwt.sign({ id: user.id }, config.secret, {
//                 expiresIn: 86400
//             });
//
//             // Profile.findOne({
//             //     userId: user._id
//             // }).exec((err, profile) => {
//             //     if (err) {
//             //         res.status(500).send({message: err});
//             //         return;
//             //     }
//             //     console.log(profile);
//             //     if (profile.driversLicence && profile.address) {
//             //         const profileValid = true;
//             //         console.log('profile is valid');
//             //     } else {
//             //         const profileValid = false;
//             //     }
//             //
//             // });
//             console.log(user);
//             res.status(200).send({
//                 id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 accessToken: token,
//                 profile: user.profileRef
//             });
//         });
// };
