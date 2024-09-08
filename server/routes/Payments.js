import express from 'express';
const router = express.Router();
import { Payment } from '../models/Payment.js';
import TryCatch from "../middlewares/TryCatch.js"; // Assuming you have this middleware
import {User} from "../models/User.js"
import {Courses} from "../models/Courses.js"
import {Progress} from "../models/Progress.js"

router.post('/pay/:id', TryCatch(async (req, res) => {
    const { cardNumber, expiryDate, cvv, currency } = req.body;

    if (!cardNumber || !expiryDate || !cvv || !currency) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const newPayment = await Payment.create({
        cardNumber,
        expiryDate,
        cvv,
        currency,
    });

    res.status(200).json({ message: 'Payment successful', paymentId: newPayment._id });
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);
    user.subscription.push(course._id);
    await Progress.create({
        course: course._id,
        completedLectures: [],
        user: req.user._id,
      });
      await user.save();
}));

export default router