import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-white h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold flex gap-5 md:gap-10 md:text-5xl justify-center items-center text-3xl">Buy Me A Chai <span><img className="invertImg" src="/tea.gif" width={88} alt="" /></span></div>

        <p className="text-center md:text-left">
          Empower your creative journey - Let your supporters fuel your passion.
        </p>
        <p className="text-center md:text-left">Join Today!</p>

        {/* Buttons for user interaction */}
        <div>
          {/* 'Get Started' button to navigate to the login page. */}
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Get Started</button>
          </Link>

          {/* 'Read More' button to navigate to the about page. */}
          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>

      </div>

      {/* Thin horizontal divider with low opacity */}
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">Let Your Supporters Treat You with a Chai</h2>
        <div className="flex gap-5 justify-around items-baseline">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
            <p className="font-bold text-center">Support That Matters</p>
            <p className="text-center">Your supporters are eager to back your creative spark.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
            <p className="font-bold text-center">Small Gestures, Big Impact</p>
            <p className="text-center">Every contribution helps fuel your dreams.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
            <p className="font-bold text-center">Build Your Community</p>
            <p className="text-center">Connect with people who believe in your vision.</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">A Sip of Humor, Bean-Style!</h2>

        {/* Responsive youtube embed  */}
        <div className="flex justify-center w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe
            src="https://www.youtube.com/embed/KSX4cwWRzis?si=BTjC1FSOaMwkrm0T" title="YouTube video player"
            // frameborder="0" 
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>
      </div>

    </>
  );
}
