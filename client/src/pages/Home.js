import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaItunes, FaMusic, FaViber } from "react-icons/fa";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing option
      once: true, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <div
      className="bg-red-300 flex flex-col space-y-8 items-center justify-center min-h-screen text-white p-4"
      style={{
        backgroundImage: "url(/spiderweb.jpeg)",
        // backgroundRepeat: 'no-repeat',
        backgroundSize: "full",
        backgroundPosition: "",
      }}
    >
      <div className="flex justify-center items-center ">
        {/* <img
    src="/log.jpg"
    alt="App Logo"
    data-aos="flip-up"
    className=" w-16 h-18 rounded-full fixed top-12 left-2 "
  /> */}
      </div>

      <div className="flex items-center  fixed bottom-20 left-96 space-x-6">
        <div className="mt-28 flex space-x-3 ">
          <div className="text-5xl animate-pulse">
            <FaMusic />
          </div>
        </div>

        {
          <h1 className="text-5xl   font-thin text-purple-300 text-left fixed right-20">
            Wasp Player
          </h1>
        }
        {/* { <img
        src="/tune-audio-anima.jpg"
        alt="Music"
        data-aos="flip-up"
        className="w-96 h- fixed left-20 bottom-72"
      /> } */}
      </div>
    </div>
  );
};

export default Home;
