import Payment from '../model/Payment.js';

export const getPayment = async (req, res) => {
  console.log(req.query)
  try {
    // const obj = JSON.parse(JSON.stringify(req.query._id));
    const payment = await Payment.find({userID: req.query._id});
    res.send({ payment });
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};

export const createPayment = async (req, res, next) => {
  try {
    //TODO lines 22-26 reference data from req
    //TODO create expiration date validation
    //TODO insert userID via getUser method

    const payment = new Payment({
      cardNumber: "",
      expDate: new Date().setFullYear(2027,8, 1),
      authCode: 118,
      creditcardType: "Visa",
      userID: null
    });
    console.log(payment);
    await payment.save();
    // res.redirect("/");
    res.send("Created");
    //TODO call createReceipt when a payment is made

    res.send("create function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const updatePayment = async (req, res, next) => {
  try {

    console.log("HERE: ", req.body);
    const filter = { userID: req.body.userid };
    const update = {
      cardNumber: req.body.cardNumber,
      expDate: req.body.expDate,
      authCode: req.body.authCode,
      creditcardType: req.body.creditcardType
    };

    let doc = await Payment.findOneAndUpdate(filter, update, {
      new: true
    });

    console.log('Doc: ', doc);

    res.send("Payment information updated");
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};
