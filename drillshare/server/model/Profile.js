import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: String,
    nameFirst: String,
    nameLast: String,
    email: String,
    phone: String,
    driversLicence: String,
    address: String,
    dob: Date,
});

const Profile = mongoose.model('Profile', ProfileSchema);


export default Profile

//Removed wallet and listings schema. I think we can reference these by doing a search for the owner ID in the listings table and payment tables.