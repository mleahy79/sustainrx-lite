import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAudioFeedback } from "../context/AudioFeedbackContext";
import logotbg from '../assets/logotbg.png';
import user_ico from '../assets/user_ico.png';

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
       <span className="text-[#178582] font-4xl font-bold">Sustain<span className="text-[#bfa174]">Rx</span></span>
        <button
          onClick={() => { toggleAudio(); playClick(); }}
          aria-label={isAudioEnabled ? "Turn off sound effects" : "Turn on sound effects"}
          className="ml-auto max-h-12 bg-neutral-800 hover:bg-[#178582] text-[#bfa174] border border-[#bfa174] mx-2 font-bold py-2 px-4 rounded transition-colors duration-300 text-sm"
        >
          {isAudioEnabled ? "Sound On" : "Sound Off"}
        </button>
        {isAuthenticated ? (
          <button onClick={() => { playClick(); logout(); }} aria-label="Sign out of your account" className="max-h-12 bg-neutral-800 hover:bg-[#178582] text-[#bfa174] border border-[#bfa174] mx-2 font-bold py-2 px-6 rounded transition-colors duration-300">
            Sign Out
          </button>
        ) : (
          <Link to="/login" onClick={playClick} className="max-h-12 bg-neutral-800 hover:bg-[#178582] text-[#bfa174] border border-[#bfa174] mx-2 font-bold py-2 px-6 rounded transition-colors duration-300">
            Sign In
          </Link>
        )}
        {isAuthenticated && (
          <Link to='/profile' onClick={playClick} aria-label="View your profile" className="ml-4 min-h-12 w-10 scale-100 hover:scale-120 transition duration-300 ease-in-out">
          <img
            src={ user_ico }
            className="w-10 h-10 rounded-full"
            alt=""
            />
        </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
