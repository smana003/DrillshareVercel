import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    listing: String,
    user: String,
    rating: Number,
    comment: String,
    month: String,
    day: Number,
    year: Number,
});

const Review = mongoose.model('Review', ReviewSchema);


export default Review