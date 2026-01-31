import React from "react";
import logotbg from "../assets/logotbg.png";

const Landing = () => {
  return (
    <div className="relative min-h-screen">
      <img
        src={logotbg}
        className="mx-auto mt-10 opacity-80 w-70 h-70"
        alt="Logo Background"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center mt-10 w-full">
        <h1 className="text-4xl text-gray-400 font-bold text-center mt-20">
          Welcome to <span className="text-[#178582]">Suatain</span>
          <span className="text-[#bfa174]">Rx</span>
        </h1>
        <p className="text-gray-400 text-center  text-lg font-bold mt-4 mx-20">
          SustainRx is dedicated to promoting sustainable practices in your code
          base.
        </p>
        <form //onSubmit={handleSubmit} 
        className="max-w-2xl mx-auto">
          <div className="flex gap-4 mt-35">
            <input
              type="text"
             // value={repoUrl}
             // onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Enter your repository URL"
              className="p-2 rounded border border-gray-300 w-150 placeholder-gray-500"
            ></input>
            <button 
            type="submit"
            className="bg-[#178582] min-w-[160px] flex hover:bg-[#0a1828] text-gray-300 font-bold py-3 px-6 rounded transition-colors duration-300">
              Start Checkup
            </button>
          </div>
        </form>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-800/20 backdrop-blur-lg p-6 rounded-lg max-w-[375px] border border-neutral-600 shadow-lg shadow-black/50">
            <h2 className="text-xl font-bold text-[#bfa174]">Medical History</h2>
            <p className="text-gray-400 mt-2">Review your commit timeline with clear, readable case notes.</p>
          </div>
          <div className="bg-neutral-800/20 backdrop-blur-lg p-6 rounded-lg max-w-[375px] border border-neutral-600 shadow-lg shadow-black/50">
            <h2 className="text-xl font-bold text-[#bfa174]">Hotspot Scan</h2>
            <p className="text-gray-400 mt-2">Identify chronic issues adding to code debt.</p>
          </div>
          <div className="bg-neutral-800/20 backdrop-blur-lg p-6 rounded-lg max-w-[375px] border border-neutral-600 shadow-lg shadow-black/50">
            <h2 className="text-xl font-bold text-[#bfa174]">Treatment Plan</h2>
            <p className="text-gray-400 mt-2">Prioritized prescriptions for sustainable code improvements.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
