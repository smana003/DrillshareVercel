import Listing from '../model/Listing.js';

export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    //TODO format the listing response to be used by frontend
    res.send({ listings });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

export const createListing = async (req, res, next) => {
  const obj = JSON.parse(JSON.stringify(req.body));

  try {
    //TODO replace this with the body of the request
    const imgPath = [];
    for (let i = 0; i < req.files.length; i++) {
      imgPath.push('/img/' + req.files[i].filename)
    }
    const listing = new Listing({
      postOwner: obj.postOwner,
      toolID: obj.toolID,
      title: obj.title,
      description: obj.description,
      photos: {
        img: imgPath,
      },
      rateHourly: obj.rateHourly,
      rateDaily: obj.rateDaily,
      currentRenter: "",
      rentalStatus: 0,
    });

    console.log(listing);

    await listing.save();
    res.send(listing);
    // res.send("Created");
  } catch (error) {
    return res.json({ error: error });
    // return res.render("error", { errorMessage: error.message });
  }
};

export const searchListing = async (req, res, next) => {
  console.log(req.query)
  if (Object.keys(req.query).length === 0) {
    try {
      const listings = await Listing.find();
      res.send({ listings });
    } catch (error) {
      console.log({ error });
      return res.render("error", { errorMessage: error.message });
    }
  } else {
    try {
      const listings = await Listing.find({ title: { "$regex": req.query.title, $options: 'i' } });
      if (listings.length === 0) {
        res.send("No Results Found");
      } else {
        res.send({ listings })
      }
    }
    catch (error) {
      console.log({ error });
      return res.render("error", { errorMessage: error.message });
    }
  }
};

export const deleteListingById = async (req, res, next) => {
  console.log(req.query);
  try {
    const listing = await Listing.findByIdAndDelete(req.query);
    res.send(listing);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
}

export const updateListing = async (req, res, next) => {
  console.log('req.body: ', req.body);
  const filter = {_id: req.body.listing};
  const update = {
    currentRenter: req.body.renter,
    rentalStatus: req.body.rentalStatus,
  }
  try {
    const listing = await Listing.findOneAndUpdate(filter, update);
    console.log(listing);
    res.send(listing);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
}

export const getRentedListings = async (req, res, next) => {
  // // console.log(req.body);
  // const filter = req.body.currentRenter;
  // try {
  //   // 6259d71d9d670d65d6c9f2a2
  //   // const listings = await Listing.find({currentRenter: req.body.id}).exec();;
  //   const listings = await Listing.find({currentRenter: '624a93072c74df5321ac25a3'}).exec();;
  //   // console.log("id is: " + req.body.id);
  //   // const listings = await Listing.find({currentRenter: "6259d71d9d670d65d6c9f2a2"});
  //   // console.log(listings);
  //   res.send(listings);
  // } catch (error) {
  //   console.log({ error });
  //   return res.render("error", { errorMessage: error.message });
  // }

  // console.log('query: ', req.query);
  try {
    const listings = await Listing.find({currentRenter: req.query._id});
    res.send(listings);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
}

export const getOwnedListings = async (req, res, next) => {
  // // console.log(req.body);
  // const filter = req.body.postOwner;
  // try {
  //   // 6259d71d9d670d65d6c9f2a2
  //   // const listings = await Listing.find({postOwner: filter}).exec();;
  //   const listings = await Listing.find({postOwner: '624a93072c74df5321ac25a3'}).exec();
  //   // console.log(listings);
  //   res.send(listings);
  // } catch (error) {
  //   console.log({ error });
  //   return res.render("error", { errorMessage: error.message });
  // }

  // console.log('query: ', req.query);
  try {
    const listings = await Listing.find({postOwner: req.query._id});
    res.send(listings);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
}