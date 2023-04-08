import mongoose from "mongoose";

const RenterSchema = new mongoose.Schema({
        nameFirst: String,
        nameLast: String,
        email: String,
        phone: String,
        driversLicence: String,
        address: String,
        dob: Date,
});

const Renter = mongoose.model('Renter', RenterSchema);


export default Renter

//Removed wallet and listings schema. I think we can reference these by doing a search for the owner ID in the listings table and payment tables.