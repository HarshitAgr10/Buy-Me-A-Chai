import React from 'react'

const Username = ({ params }) => {
  return (
    <>

      <div className='cover w-full bg-red-50 relative'>
        <img className='object-cover w-full h-[350]' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-time=1741046400&amp;token-hash=r2gFXRwEOzQAxawtmgMkAf09Z2hmyyFGLs7r9ACrwT4%3D" alt="" />

        <div className='absolute -bottom-20 right-[45%] border-2 border-white rounded-full'>
          <img className='rounded-full' width={125} height={125} src="https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/11697403/heaths_joker_300x128.jpg.jpg?quality=90&strip=all&crop=30.513698630137,0,42.575342465753,100" alt="" />
        </div>
      </div>

      <div className="info flex justify-center items-center my-24 flex-col gap-2">
        <div className='font-bold text-lg'>

          @{params.username}
        </div>
        <div className='text-slate-400'>
          Building tools and libraries for developers worldwide
        </div>
        <div className='text-slate-400'>
          9,719 supporters . 12 projects . $2,450 per release
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-10">
            {/* Show list of all the supporters as a LeaderBoard */}
            <h2 className='text-2xl font-bold my-5'>Supporters</h2>
            <ul className='mx-5 text-lg'>
              <li className='my-4 flex gap-2 items-center'>
                <img width={33} src="avatar.gif" alt="user avatar" />
                <span>abc donated <span className='font-bold'>$30</span> with a message "Fueling your code with a chai—keep the bugs away!"</span>
              </li>
              <li className='my-4 flex gap-2 items-center'>
                <img width={33} src="avatar.gif" alt="user avatar" />
                <span>abc donated <span className='font-bold'>$30</span> with a message "Fueling your code with a chai—keep the bugs away!"</span>
              </li>
              <li className='my-4 flex gap-2 items-center'>
                <img width={33} src="avatar.gif" alt="user avatar" />
                <span>abc donated <span className='font-bold'>$30</span> with a message "Fueling your code with a chai—keep the bugs away!"</span>
              </li>

            </ul>
          </div>

          <div className="makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <div>
                <input type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
              </div>
              <input type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
              <input type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />

              <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
            </div>

            {/* Or choose from the following amounts */}
            <div className='flex gap-2 mt-5'>
              <button className='bg-slate-800 p-3 rounded-lg'>Pay $10</button>
              <button className='bg-slate-800 p-3 rounded-lg'>Pay $20</button>
              <button className='bg-slate-800 p-3 rounded-lg'>Pay $30</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Username
