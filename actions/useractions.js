"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

/* Function to initiate a payment using Razorpay and store pending payment in DB and returns Razorpay order details. */
export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();

    /* Fetch user details(who is getting payment) from the DB to get their Razorpay secret key */
    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaysecret

    /* Create a new Razorpay instance using the recipient's Razorpay credentials */
    // var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })
    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })


    /* Define the order details to be created in Razorpay */
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    /* Create an order using Razorpay API */
    let x = await instance.orders.create(options)

    /* Store the payment details in the DB, marking it as pending */
    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message })

    return x;
}

/** 
 * Function to Fetch user details from the database based on the username.
 * Returns User details as a plain JavaScript object.
*/
export const fetchuser = async (username) => {
    await connectDb();
    let u = await User.findOne({ username: username })
    // Convert Mongoose object to plain object
    let user = u.toObject({ flattenObjectIds: true })  
    return user;
}

/** 
 * Function to retrieve the top 10 successful payments made to a user, sorted by amount.
 * Returns list of payment objects.
*/
export const fetchpayments = async (username) => {
    await connectDb();
    /* Find payments made to the user, filter only completed ones, sort by highest amount, and limit to 10 and flatten object Ids */
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    return p;
}

/** 
 * Function to update the user profile details in the database.
 * Parameters:
   - data: The new profile data (FormData object).
   - oldusername: The current username before update.
 * Returns error message if username already exists, otherwise updates the profile.
*/
export const updateProfile = async (data, oldusername) => {
    await connectDb()
    // Convert FormData to a plain object
    let ndata = Object.fromEntries(data)  

    /* If the username is being updated, check if the new username is already taken */
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }

        /* Update user data in database using email as the identifier */
        await User.updateOne({ email: ndata.email }, ndata)

        /* Update all payments associated with the old username to reflect the new username */
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    }
    else {
         /* If the username remains the same, update only the user's profile details */
        await User.updateOne({ email: ndata.email }, ndata)
    }
}