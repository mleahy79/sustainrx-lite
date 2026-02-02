import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAudioFeedback } from "../context/AudioFeedbackContext";
import logotbg from '../assets/logotbg.png';
import user_ico from '../assets/user_ico.png';
import hearing from '../assets/hearing.png';

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const { playClick, isAudioEnabled, toggleAudio } = useAudioFeedback();

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 px-6 py-3 bg-transparent">
      <div className="bg-neutral-800/20 sticky backdrop-blur-lg p-3 my-4 border-gray-700 border-1 rounded-lg text-white text-2xl font-bold shadow-lg shadow-black/50 flex items-center justify-between overflow-hidden">
        <Link to="/" aria-label="Navigate to home" onClick={playClick}>
          <img
            src={ logotbg }
            className="w-16 h-16 rounded-md mx-6"
            alt="SustainRx logo"
          />
        </Link>
       <span className="hidden sm:inline text-[#178582] font-4xl font-bold">Sustain<span className="text-[#bfa174]">Rx</span></span>
        
        <div className="flex items-center ml-auto">
        {isAuthenticated ? (
          <button onClick={() => { playClick(); logout(); }} aria-label="Sign out of your account" className="max-h-12 bg-[#178582] hover:bg-neutral-800 text-[#bfa174] border border-[#bfa174] mx-2 font-bold py-2 px-3 sm:px-6 rounded transition-colors duration-300 text-sm sm:text-base whitespace-nowrap">
            Sign Out
          </button>
        ) : (
          <Link to="/login" onClick={playClick} className="max-h-12 bg-[#178582] hover:bg-neutral-800 text-[#bfa174] border border-[#bfa174] mx-2 font-bold py-2 px-3 sm:px-6 rounded transition-colors duration-300 text-sm sm:text-base whitespace-nowrap">
            Sign In
          </Link>
        )}
        <img
        onClick={() => { toggleAudio(); playClick(); }}
        src= { hearing }
        aria-label={isAudioEnabled ? "Turn off sound effects" : "Turn on sound effects"}
        className="ml-4 max-h-12 w-12 scale-100 hover:scale-120 transition duration-300 ease-in-out cursor-pointer"
        alt="Audio feedback toggle"
        />
        {isAuthenticated && (
          <Link to='/profile' onClick={playClick} aria-label="View your profile" className="ml-4 min-h-12 mr-4 w-10 scale-100 hover:scale-120 transition duration-300 ease-in-out">
          <img
            src={ user_ico }
            className="w-12 h-12 rounded-full"
            alt=""
            />
        </Link>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
