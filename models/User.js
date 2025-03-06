import mongoose from "mongoose";
const {Schema, model} = mongoose;

/* 
   Define the UserSchema using Mongoose which represents the structure of user-related data in the MongoDB database.
*/
const UserSchema = new Schema ({
    email: { type: String, required: true },
    name: { type: String },
    username: { type: String, required: true },
    profilepic: { type: String},
    coverpic: { type: String},
    razorpayid: { type: String },
    razorpaysecret: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || model("User", UserSchema);

/**
 * Export the User model.
 * `mongoose.models.User` prevents model redefinition errors in Next.js.
 * If the User model does not exist, it creates a new one using `model("User", UserSchema)`.
*/