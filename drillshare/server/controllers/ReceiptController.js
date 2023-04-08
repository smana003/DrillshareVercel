import Receipt from '../model/Receipt.js';

export const getReceipt = async (req, res) => {
  //TODO getReceipt

  // res.header("Access-Control-Allow-Origin", "true");
  try {
    // const receipt = await Receipt.find();
    // res.send({ receipt });
    res.send("get function incomplete");
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createReceipt = async (req, res, next) => {
  try {
    //TODO lines 21-30 reference data from req
    //TODO create deliveryID when req.isDelivered
    const receipt = new Receipt({
      owner: "Bob Owner",
      renter: "Steve Renter",
      dateStart: new Date.now(),
      dateEnd: new Date.parse("March 31, 2022"),
      priceRent: 300.00,
      priceDelivery: 50.00,
      isPaid: new Boolean(false),
      isActive: new Boolean(true),
      isComplete: new Boolean(false),
      deliveryID: ""

    });
    // console.log(contract);
    // await contract.save();
    // res.redirect("/");
    // res.send("Created");
    res.send("create function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const updateReceipt = async (req, res, next) => {
  try {
    //TODO updateReceipt

    // find contract
    // const contract = await Contract.find();
    // update with new parameters
    // save contract
    // await contract.save();
    // res.redirect("/");
    // res.send("Created");
    res.send("update function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};
