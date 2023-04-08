import Contract from '../model/Contract.js';

export const getContract = async (req, res) => {
  //TODO getContract

  // res.header("Access-Control-Allow-Origin", "true");
  try {
    // const contract = {}; //await Contract.find();
    // res.send({ contract });
    res.send("get contract function incomplete");
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createContract = async (req, res, next) => {
  try {
    //TODO lines 19-28 reference data from req
    const contract = new Contract({
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
    console.log(contract);
    await contract.save();
    // res.redirect("/");
    res.send("Created");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const updateContract = async (req, res, next) => {
  try {
    //TODO updateContract

    // find contract
    // const contract = await Contract.find();
    // update with new parameters
    // save contract
    // await contract.save();
    // res.redirect("/");
    // res.send("Created");
    res.send("Update contract function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

// Possible functions:
  // completeContract