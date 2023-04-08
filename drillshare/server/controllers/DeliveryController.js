import Delivery from '../model/Delivery.js';

export const getDelivery = async (req, res) => {
  //TODO getDelivery

  // res.header("Access-Control-Allow-Origin", "true");
  try {
    // const contract = {}; //await Contract.find();
    // res.send({ contract });
    res.send("get delivery function incomplete");
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createDelivery = async (req, res, next) => {
  try {
    //TODO replace hard coded with req
    //TODO write address validation
    const delivery = new Delivery({
      owner: "Mary Owner",
      renter: "Jack Renter",
      dateDelivery: new Date.parse("March 20, 2022"),
      dateDelivered: null,
      isActive: new Boolean(true),
      isDelivered: new Boolean(false),
      address: "123 Market Street San Francisco, CA "
    });
    console.log(delivery);
    await delivery.save();
    // res.redirect("/");
    res.send("Created");
    res.send("create delivery function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const updateDelivery = async (req, res, next) => {
  try {
    //TODO updateDelivery

    // find delivery
    // const delivery = await Delivery.find();
    // update with new parameters
    // save delivery
    // await delivery.save();
    // res.redirect("/");
    // res.send("Created");
    res.send("Update delivery function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const completeDelivery = async (req, res, next) => {
  try {
    //TODO completeDelivery

          // find delivery
          // const delivery = await Delivery.find();
          // update dateDelivered, isActive, isDelivered
          // save delivery

          // await delivery.save();
          // res.redirect("/");
          // res.send("Created");
    res.send("complete delivery function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};