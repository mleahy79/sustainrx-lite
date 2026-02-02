import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();

  const screenName = user?.reloadUserInfo?.screenName;
  const email = user?.email;
  const photoURL = user?.photoURL;
  const memberSince = user?.metadata?.creationTime;

  return (
    <div className="flex justify-center max-h-screen min-w-full py-10">
      <div className="min-h-175 min-w-200 flex rounded-2xl flex-col border-1 bg-bg-radial-[at_bottom] from-[#178582] via-neutral-800 to-[#0a1828] text-gray-700 p-4 shadow-lg shadow-black/50 ">
        <div className="text-center text-5xl font-bold text-[#178582] mb-6">
          Sustain<span className="text-[#bfa174]">Rx</span>
        </div>
        <h1 className="text-3xl text-center font-bold mb-8 text-gray-400">
          Profile
        </h1>
        {user ? (
          <div>
            <img src={photoURL} className="w-18 h-18 self-center mb-4 rounded-full mx-auto" alt="Profile" />
            <p className="text-xl mx-20 font-bold text-[#bfa174] mt-12 mb-4">
             <span className="text-gray-400">Welcome,</span> {screenName || email}
            </p>
            <p className="text-lg mx-20 mb-4 text-[#bfa174]"><span className="text-gray-400">Email:</span> {email}</p>
            <p className="text-lg mx-20 text-[#bfa174]">
             <span className="text-gray-400">Member Since:</span> {memberSince}
            </p>
            <a href="/">
              <img
                src="/logorxdark.png"
                className="w-40 h-auto mx-auto block mt-20"
                alt="logo img"
              />
            </a>
          </div>
        ) : (
          <p className="text-3xl text-[#bfa174]">
            Please log in to view your profile.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
