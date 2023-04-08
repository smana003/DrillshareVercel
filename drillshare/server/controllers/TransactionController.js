import Transaction from '../model/Transaction.js';

export const getTransaction = async (req, res) => {
  //TODO getTransaction

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

export const createTransaction = async (req, res, next) => {
  try {
    //TODO replace with body of req

    const transaction = new Transaction({
      contract: "86066760542694",
      subtotal: 300.00,
      tax: 26.25,
      total: 326.25,
      transactionStatus: 0
    });

    console.log(transaction);
    await transaction.save();
    // res.redirect("/");
    res.send("Created");
    res.send("create function incomplete");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    //TODO updateTransaction

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
