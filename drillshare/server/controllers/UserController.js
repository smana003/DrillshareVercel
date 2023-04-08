import User from '../model/User.js';

export const getUser = async (req, res) => {
  //TODO getUser

  // res.header("Access-Control-Allow-Origin", "true");
  try {
    // const user = await User.find(username);
    // res.send({ user });
    res.send("get function incomplete");
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createUser = async (req, res, next) => {
  try {
    //TODO replace with body of req

    const user = new User({
      nameFirst: "Jakayla",
      nameLast: "Rober",
      email: "jakayla.rober@gmail.com",
      phone: "555-596-7489",
      driversLicence: "M5335959",
      address: "2207 Peck Court Irvine, CA 92618",
      dob: new Date.parse("5/26/1985"),
      userType: 0
    });

    console.log(user);
    await user.save();
    // res.redirect("/");
    res.send("Created");
    res.send("create function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const getUserById = async (req, res, next) => {
  console.log(req.query);
  try {
    const user = await User.find({ _id: req.query._id });
    console.log(user);
    res.send(user[0].username)
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
}

export const updateUser = async (req, res, next) => {
  try {
    //TODO updateUser

    // find user
    // const user = await User.find();
    // update with new parameters
    // save user
    // await user.save();
    // res.redirect("/");
    // res.send("Created");
    res.send("update function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
export const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};