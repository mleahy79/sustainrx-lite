import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-800/20 backdrop-blur-lg p-6 rounded-lg border border-neutral-600 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 text-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="w-full flex justify-center mr-8">
            <a href="/">
              <img
                src="/logorxdark.png"
                className="w-22 h-auto flex justify-center"
                alt="logo img"
              />
            </a>
          </div>
          <div>
            <div className="text-center flex flex-col">
              <h1 className="text-[#178582] text-center text-xl font-bold">
                Sustain<span className="text-[#bfa174]">Rx</span>
              </h1>
              <div className="text-center flex flex-col">
                <Link to="/login" className="mb-1 text-xl hover:text-white mt-4">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center flex flex-col">
            <a href="/about" className="mb-2 hover:text-white">
              About Us
            </a>
            <a href="/contact" className="mb-2 hover:text-white">
              Contact
            </a>
            <a href="/FAQ" className="mb-2 hover:text-white">
              FAQ
            </a>
          </div>
        </div>
      </div>
      <div className="text-wrap text-[#bfa174] text-center">
        &copy; {new Date().getFullYear()} SustainRx. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
