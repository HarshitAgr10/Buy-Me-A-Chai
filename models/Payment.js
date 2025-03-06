import mongoose from "mongoose";
const { Schema, model } = mongoose;

/* 
   Define the PaymentSchema using Mongoose which represents the structure of payment-related data in the MongoDB database.
*/
const PaymentSchema = new Schema({
    name: { type:String, required: true },
    to_user: { type:String, required: true },
    oid: { type:String, required: true },
    message: { type: String },
    amount: { type: Number, required: true },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
    done: { type: Boolean, default: false }
});


export default mongoose.models.Payment || model("Payment", PaymentSchema);

/**
 * Export the Payment model.
 * `mongoose.models.Payment` prevents model redefinition errors in Next.js
 * If the Payment model does not exist, it creates a new one using `model("Payment", PaymentSchema)`.
*/