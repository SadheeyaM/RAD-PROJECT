import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    cardNumber: { 
        type: String, 
        required: true, 
        minlength: 13,    
        maxlength: 19,   
    },
    expiryDate: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(value) {
                const [month, year] = value.split("/");
                const expiry = new Date(`20${year}`, month - 1);  
                const now = new Date();
                return expiry > now;  
            },
            message: "Expiry date must be valid and in the future."
        }
    },
    cvv: { 
        type: String, 
        required: true, 
        minlength: 3,  
        maxlength: 4, 
    },
    currency: { 
        type: String, 
        required: true, 
    },
}, { timestamps: true });

export const Payment = mongoose.model('Payment', paymentSchema);
