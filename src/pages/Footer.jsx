import React from "react";
import { Link } from "react-router-dom";
import { useAudioFeedback } from "../context/AudioFeedbackContext";

const Footer = () => {
  const { playClick } = useAudioFeedback();

  return (
    <footer className="bg-neutral-800/20 backdrop-blur-lg p-6 rounded-lg border border-neutral-600 shadow-lg shadow-black/50 md:mt-20 mt-10 mb-4">
      <div className="max-w-7xl mx-auto px-4 text-gray-400">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-4 items-center">
          <div className="w-full flex justify-center col-span-2 md:col-span-1">
            <Link to="/" aria-label="Navigate to home" onClick={playClick}>
              <img
                src={`${import.meta.env.BASE_URL}logorxdark.png`}
                className="w-22 h-auto flex justify-center"
                alt=""
              />
            </Link>
          </div>
          <div>
            <div className="text-center flex flex-col">
              <span className="text-[#178582] text-center text-xl font-bold">
                Sustain<span className="text-[#bfa174]">Rx</span>
              </span>
              <div className="text-wrap text-[#bfa174] text-center flex mt-2 md:mt-10 flex-col text-sm">
                &copy; {new Date().getFullYear()} SustainRx. All rights
                reserved.
              </div>
            </div>
          </div>
          <nav aria-label="Footer navigation" className="text-center flex flex-col">
            <Link to="/login" onClick={playClick} className="mb-1 hover:text-white">
              Sign In
            </Link>
            <Link to="/about" onClick={playClick} className="mb-2 hover:text-white">
              About Us
            </Link>
            <Link to="/faq" onClick={playClick} className="mb-2 hover:text-white">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
