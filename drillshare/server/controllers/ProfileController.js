import Profile from '../model/Profile.js';

export const getProfile = async (req, res, next) => {
    //TODO getRenter

    // res.header("Access-Control-Allow-Origin", "true");
    console.log('body: ', req.query)
    try {
        const profile = await Profile.find({userId: req.query._id});
        // console.log('profile: ', profile)
        res.send({ profile });
    } catch (error) {
        console.log({ error });
        return res.render("error", { errorMessage: error.message });
    }
};

// export const createProfile = async (req, res, next) => {
//     const obj = JSON.parse(JSON.stringify(req.body));
//     console.log(obj);
//     console.log(req);
//     try {
//         //TODO replace with body of req
//         // profile will originally made empty with just a reference to the ID of the user. this is because when a user signups with the site, they are only prompted for the username, email, and password. this information will need to be updated later by the user in their profile page. this info will be stored by the updateProfile function belw.
//
//         const profile = new Profile({
//             userId: obj.userId,
//             nameFirst: obj.nameFirst,
//             nameLast: obj.nameLast,
//             email: obj.email,
//             phone: obj.phone,
//             driversLicence: obj.driversLicence,
//             address: obj.address,
//             dob: obj.dob
//         });
//
//         console.log(profile);
//         await profile.save();
//         // res.redirect("/");
//         res.send("Created");
//         // res.send("create function incomplete");
//
//     } catch (error) {
//         return res.json({ error: error });
//         // return res.render("error", { errorMessage: error.message });
//     }
// };

export const updateProfile = async (req, res, next) => {
    // console.log(req.body)
    try {
        const filter = { userId: req.body.id };
        const update = {
            nameFirst: req.body.nameFirst,
            nameLast: req.body.nameLast,
            email: req.body.email,
            phone: req.body.phone,
            driversLicence: req.body.driversLicence,
            address: req.body.address,
            dob: Date.parse(req.body.dob)
        };

        let doc = await Profile.findOneAndUpdate(filter, update, {
            new: true
        });

        res.send("updated");
    } catch (error) {
        return res.json({ error: error });
        // return res.render("error", { errorMessage: error.message });
    }
};
