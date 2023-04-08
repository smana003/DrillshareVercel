import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
        owner: String,
        renter: String,
        dateDelivery: Date,
        dateDelivered: Date,
        isActive: Boolean,
        isDelivered: Boolean,
        address: String
    });

const Delivery = mongoose.model('Delivery', DeliverySchema);


export default Delivery

//TODO change delivery schema owner and renter to correct ID types.
//      refer to mongoose schema doc