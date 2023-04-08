import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  toolID: String,
  title: String,
  description: String,
  photos: {
    img: Array,
  },
  rateHourly: Number,
  rateDaily: Number,
  postOwner: String,
  currentRenter: String,
  rentalStatus: Number,
  // 1 renter holds tool
  // 2 owner holds tool
  // 3 tool lost/stolen/missing

});

const Listing = mongoose.model('Listing', ListingSchema);

export default Listing