"use client"     // This directive ensures that the component runs on the client side.
import React from 'react'
import Link from 'next/link'    // Used for client-side navigation between pages.
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {

    /** 
     * session contains user authentication data (e.g., email, name) if the user is logged in.
     * If the user is not logged in, session will be null.    
    */
    const { data: session } = useSession()

    // if (session) {
    //     return <>
    //         Signed in as {session.user.email} <br />
    //         <button onClick={() => signOut()}>Sign out</button>
    //     </>
    // }

    // State to manage dropdown visibility.
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <nav className='bg-gray-900 text-white flex justify-between items-center px-4 md:h-16 flex-col md:flex-row'>

            {/* Logo Section: Contains the brand name and a logo image */}
            <Link className="logo font-bold text-lg flex justify-center items-center" href={"/"}>
                <img className='invertImg' src="tea.gif" width={44} alt="" />
                <span className='text-xl md:text-base my-3 md:my-0'>Buy Me A Chai</span>
            </Link>

            {/* Navigation and Authentication Section */}
            <div className='relative flex justify-center items-center md:block gap-4'>

                 {/* If the user is logged in, show the dropdown menu */}
                {session && <><button
                    // Toggles the dropdown menu when clicked.
                    onClick={() => setShowDropdown(!showDropdown)}
                    // Hides dropdown when clicking outside of it after 100ms delay to prevent instant closure.
                    onBlur={() => { setTimeout(() => { setShowDropdown(false) }, 100); }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                    {/* Dropdown menu for logged-in users */}
                    <div id="dropdown" className={`z-10 ${showDropdown ? "" : "hidden"} absolute left-[125] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            {/* Link to user dashboard */}
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>

                            {/* Link to the user's personal page (dynamic based on user name) */}
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>

                            {/* Sign out option */}
                            <li>
                                <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </>}

                {/* Logout Button for authenticated users */}
                {session && <button className="text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => { signOut() }}>Logout</button>}

                {/* Login Button for non-authenticated users */}
                {!session && <Link href={"/login"}>
                    <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Login</button></Link>}
            </div>

        </nav>
    )
}

export default Navbar
