import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
        cardNumber: String,
        expDate: Date,
        authCode: Number,
        creditcardType: String,
        userID: String
});

const Payment = mongoose.model('Payment', PaymentSchema);


export default Payment
