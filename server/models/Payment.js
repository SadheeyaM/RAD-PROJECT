import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    currency: { type: String, required: true },
}, { timestamps: true });

export const Payment = mongoose.model('Payment', paymentSchema);

