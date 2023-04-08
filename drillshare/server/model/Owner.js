import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
        nameFirst: String,
        nameLast: String,
        email: String,
        phone: String,
        driversLicence: String,
        address: String,
        dob: Date,
});

const Owner = mongoose.model('Owner', OwnerSchema);


export default Owner


//Removed wallet and listings schema. I think we can reference these by doing a search for the owner ID in the listings table and payment tables.