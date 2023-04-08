import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema({
  owner: String,
  renter: String,
  dateStart: Date,
  dateEnd: Date,
  priceRent: Number,
  priceDelivery: Number,
  isPaid: Boolean,
  isActive: Boolean,
  isComplete: Boolean,
  deliveryID: String,
});

const Contract = mongoose.model("Contract", ContractSchema);

export default Contract;
