import Renter from '../model/Renter.js';

export const getRenter = async (req, res) => {
  //TODO getRenter

  // res.header("Access-Control-Allow-Origin", "true");
  try {
    // const contract = {}; //await Contract.find();
    // res.send({ contract });
    res.send("get function incomplete");
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createRenter = async (req, res, next) => {
  try {
    //TODO replace with body of req

    const renter = new Renter({
      nameFirst: "John",
      nameLast: "Renter",
      email: "JohnRenter@gmail.com",
      phone: "(949) 090 9090",
      driversLicence: "FA128947",
      address: "2898 Khale Street North Charleston, SC 29420",
      dob: new Date.parse("May 5, 1995")
    });

    console.log(renter);
    await renter.save();
    // res.redirect("/");
    res.send("Created");
    res.send("create function incomplete");

  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const updateRenter = async (req, res, next) => {
  try {
    //TODO updateRenter

    // find renter
    // const renter = await Contract.find();
    // update with new parameters
    // save renter
    // await renter.save();
    // res.redirect("/");
    // res.send("Created");
    res.send("update function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};
