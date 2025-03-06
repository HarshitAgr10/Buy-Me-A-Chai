import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({ params }) => {

  /** 
   * Function to check if the provided username exists in the database.
   * If the username is not found, it triggers a 404 page.
  */
  const checkUser = async () => {
    await connectDb()
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }

  await checkUser()

  return (
    <>
     {/* Render the PaymentPage component and pass username as a prop */}
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username

/** 
 * Function to dynamically generate the metadata for the page.
 * To set the page title to personalize experience based on the username.
*/
// or Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Buy Me A Chai`,
  }
}