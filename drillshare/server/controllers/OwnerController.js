import Owner from '../model/Owner.js';

export const getOwner = async (req, res) => {
  //TODO getOwner

  // res.header("Access-Control-Allow-Origin", "true");
  try {
    // const owner = await Owner.find();
    // res.send({ contract });
    res.send("get function incomplete");
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createOwner = async (req, res, next) => {
  try {
    //TODO replace with body of request
    const owner = new Owner({
      nameFirst: "Bob",
      nameLast: "Owner",
      email: "BobOwner@gmail.com",
      phone: "(949) 246-0909",
      driversLicence: "FL919191",
      address: "291 Delaware Avenue San Francisco, CA 94108",
      dob: new Date.parse("December 10 1980")
    });
    console.log(owner);
    await owner.save();
    // res.redirect("/");
    res.send("Created");
    res.send("create function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const updateOwner = async (req, res, next) => {
  try {
    //TODO updateOwner

    // find owner
    // const owner = await Owner.find();
    // update with new parameters
    // save owner
    // await owner.save();
    // res.redirect("/");
    // res.send("Created");
    res.send("update function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};
