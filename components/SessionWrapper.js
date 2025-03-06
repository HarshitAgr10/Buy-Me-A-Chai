"use client"
import { SessionProvider } from "next-auth/react"

export default function SessionWrapper({children}) {
  return (
    /* To Provide session context to all child components */
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}



/* 
  SessionWrapper component wraps the application with SessionProvider to manage authentication state using NextAuth.
*/