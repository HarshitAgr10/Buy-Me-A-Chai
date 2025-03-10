"use client"
import React, { useEffect } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()

    /** 
     * State variables to manage payment form inputs, user details, and payment records retrieved from the database.
    */
    const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    /* useEffect to fetch user and payment data when the component mounts. */
    useEffect(() => {
        getData();
    }, [])

     /** useEffect to show a toast notification if payment is successful.
       * Redirects the user to their username-specific page after displaying message.
    */
    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('🦄 Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)

    }, [])


    /* Function to update state when user inputs values in the payment form. */
    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    /* Fetches user details and past payment records from the backend. */
    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)

        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        // console.log(u, dbpayments)
    }

    /** Initiates the payment process using Razorpay.
     *  Retrieves order ID from backend and passes it to Razorpay checkout.
    */
    const pay = async (amount) => {
        // Get the order id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id

        var options = {
            // "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "key": currentUser.razorpayid,
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Buy Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }


    return (
        <>
            {/* Toast notifications for successful payments. */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* Importing Razorpay payment script dynamically. */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            {/* Cover image section with user profile picture overlay. */}
            <div className='cover w-full bg-red-50 relative'>
                <img className='object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm' src={currentUser.coverpic} alt="" />

                <div className='absolute -bottom-20 right-[35%] md:right-[45%] border-2 border-white rounded-full overflow-hidden size-36'>
                    <img className='rounded-full object-cover size-36' width={125} height={125} src={currentUser.profilepic} alt="" />
                </div>
            </div>

            {/* Display user information and total amount raised. */}
            <div className="info flex justify-center items-center my-24 flex-col gap-2">
                <div className='font-bold text-lg'>

                    @{username}
                </div>
                <div className='text-slate-400'>
                    Building Web Applications for Businesses Worldwide!
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments . {payments.reduce((a, b) => a + b.amount, 0)} raised!
                </div>

                {/* Payment and supporters section. */}
                <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        {/* Display top 10 supporters. */}
                        <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            {payments.length == 0 && <li>No Payments Yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-4 flex gap-2 items-center'>
                                    <img width={33} src="avatar.gif" alt="user avatar" />
                                    <span>{p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"</span>
                                </li>
                            })}

                        </ul>
                    </div>

                    {/* Payment input form and predefined payment buttons. */}
                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className="flex gap-2 flex-col">
                            <div>
                                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            </div>
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />

                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-blue-300" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount < 1}>Pay</button>
                        </div>

                        {/*  Predefined amount buttons. */}                         
                        <div className='flex flex-col md:flex-row gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage


/**
 * coverpic:- src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-time=1741046400&amp;token-hash=r2gFXRwEOzQAxawtmgMkAf09Z2hmyyFGLs7r9ACrwT4%3D" 
 * 
 * profilepic:- src="https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/11697403/heaths_joker_300x128.jpg.jpg?quality=90&strip=all&crop=30.513698630137,0,42.575342465753,100"
 */