import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import logotbg from '../assets/logotbg.png';

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <div className="bg-neutral-800/20 backdrop-blur-lg p-3 my-4 mx-6 border-1 border-neutral-600 rounded-lg text-white text-2xl font-bold shadow-lg shadow-black/50 flex items-center justify-between sticky top-0 z-50">
        <Link to="/">
          <img
            src={ logotbg }
            className="w-16 h-16 rounded-md mx-6"
            alt="Logo"
          />
        </Link>
       <h1 className="text-[#178582] font-4xl font-bold">Sustain<span className="text-[#bfa174]">Rx</span></h1>
        {isAuthenticated ? (
          <button onClick={logout} className="ml-auto max-h-12 bg-neutral-800 hover:bg-[#178582] text-[#bfa174] border border-[#bfa174] mx-6 font-bold py-2 px-6 rounded transition-colors duration-300">
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/login" className="ml-auto max-h-12 bg-neutral-800 hover:bg-[#178582] text-[#bfa174] border border-[#bfa174] mx-6 font-bold py-2 px-6 rounded transition-colors duration-300">
              Sign In
            </Link>
            <Link to="/login" className="ml-4 max-h-12 bg-neutral-800 hover:bg-[#178582] text-[#bfa174] border border-[#bfa174] mx-6 font-bold py-2 px-6 rounded transition-colors duration-300">
              Sign Up
            </Link>
          </>
        )}
        <div>
          {faAddressCard && (
            <FontAwesomeIcon
              icon={faAddressCard}
              className="text-white ml-4 min-h-12 w-10 hover:text-[#178582]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
