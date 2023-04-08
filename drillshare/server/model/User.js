import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        username: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true },
        nameFirst: String,
        nameLast: String,
        email: String,
        phone: String,
        driversLicence: String,
        address: String,
        dob: Date,
        userType: Number,
        // UserType is a number with
        //      0 being owner
        //      1 being renter
        //      2 being both
},
    {
            toJSON: { virtuals: true }
    })
;

const User = mongoose.model('User', UserSchema);

export default User

//Removed wallet and listings schema.
// I think we can reference these by doing a search for
// the owner ID in the listings table and payment tables
