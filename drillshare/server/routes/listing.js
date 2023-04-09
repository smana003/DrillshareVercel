const express = require("express");
const listingRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// const multer = require('multer');
// const path = require('path');

// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../client/public/img'));
//   },
//   filename: (req, file, cb) => {
//     console.log('multer: ', file)
//     console.log('multer req: ', req.body);
//     cb(null, Date.now() + file.originalname)
//   }
// });

// const upload = multer({ storage: imageStorage });

listingRoutes.route('/api/').get(async (req, res) => {
  let db_connect = dbo.getDb();

  await db_connect
    .collection("listing")
    .find({})
    .toArray()
    .then((data) => {
      res.json(data);
    });
});

// listingRoutes.route('/api/createListing', upload.array('image')).post(async (req, res) => {
//   // const obj = JSON.parse(JSON.stringify(req.body));

//   // try {
//   //   //TODO replace this with the body of the request
//   //   const imgPath = [];
//   //   for (let i = 0; i < req.files.length; i++) {
//   //     imgPath.push('/img/' + req.files[i].filename)
//   //   }
//   //   const listing = new Listing({
//   //     postOwner: obj.postOwner,
//   //     toolID: obj.toolID,
//   //     title: obj.title,
//   //     description: obj.description,
//   //     photos: {
//   //       img: imgPath,
//   //     },
//   //     rateHourly: obj.rateHourly,
//   //     rateDaily: obj.rateDaily,
//   //     currentRenter: "",
//   //     rentalStatus: 0,
//   //   });

//   //   console.log(listing);

//   //   await listing.save();
//   //   res.send(listing);
//   //   // res.send("Created");
//   // } catch (error) {
//   //   return res.json({ error: error });
//   //   // return res.render("error", { errorMessage: error.message });
//   // }

//   let db_connect = dbo.getDb();
//   const obj = JSON.parse(JSON.stringify(req.body));
//   console.log(req.body);

// })



module.exports = listingRoutes;