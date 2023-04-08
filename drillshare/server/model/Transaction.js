import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
        contract: String,
        subtotal: Number,
        tax: Number,
        total: Number,
        transactionStatus: Number
        // 0 being complete
        // 1 being in progress
        // 2 being error
});

const Transaction = mongoose.model('Transaction', TransactionSchema);


export default Transaction
