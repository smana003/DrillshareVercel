import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema({
        payTo: String,
        payFrom: String,
        subtotal: Number,
        tax: Number,
        total: Number,
        amountPaid: Number
});

const Receipt = mongoose.model('Receipt', ReceiptSchema);


export default Receipt

