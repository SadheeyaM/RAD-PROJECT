import mongoose from "mongoose";

const schema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", schema);