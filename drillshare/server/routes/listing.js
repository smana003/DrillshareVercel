const express = require("express");
const listingRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


listingRoutes.route('/api/').get(async (req, res) => {
  // try {
  //   const listings = await Listing.find();
  //   //TODO format the listing response to be used by frontend
  //   res.send({ listings });
  // } catch (error) {
  //   console.log({ error });
  //   return res.render("error", { errorMessage: error.message });
  // }

  let db_connect = dbo.getDb();

  db_connect
    .collection("listing")
    .find({})
    .toArray()
    .then((data) => {
      res.json(data);
    });
});

module.exports = listingRoutes;