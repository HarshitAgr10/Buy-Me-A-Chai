import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDb()
    let body = await req.formData()
    body = Object.fromEntries(body)  // Convert form data into a JavaScript object

    /**
     * Step 1: Check if the provided razorpayOrderId exists in the database.
     * If the order ID does not exist, return an error response.
    */
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ success: false, message: "Order Id not found" })
    }

    /**
     * Step 2: Fetch the secret key of user receiving the payment from database.
     * This secret key will be used to verify the payment signature.
    */
    let user = await User.findOne({ username: p.to_user })
    const secret = user.razorpaysecret

    /**
     * Step 3: Verify the payment using Razorpay's signature verification function.
     * This ensures that the payment details received are authentic and have not been tampered with.
    */
    // let xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, process.env.KEY_SECRET);
    let xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, secret);

    if (xx) {
        // Update the payment status 
        /**
         * Step 4: If the payment verification is successful, update the payment status in the database.
         * The payment record is updated to mark it as completed.
        */
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: "true" },
            { new: true });

        /**
         * Step 5: Redirect the user to success page with payment confirmation.
         * The redirect URL includes a query parameter indicating successful payment.
        */
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }

    else {
        /**
         * Step 6: If payment verification fails, return an error response.
         * This ensures that only verified payments are processed successfully.
        */
        return NextResponse.json({ success: false, message: "Payment Verification Failed" });
    }
}