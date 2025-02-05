import React, { useState } from "react";
import eyeIcon from "../../../image/eye.png";
import eyeSlashIcon from "../../../image/eye_close.png";

const ProfileInfo = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 sm:p-8 mt-10">
      <h2 className="lg:text-2xl md:text-xl text-xl  font-bold mb-4 text-gray-800">Public Profile</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
        Add information about yourself to build your public profile.
      </p>
      <form className="space-y-6 sm:space-y-8">
        {/* Full Name and Gender */}
        <div className="flex flex-wrap items-start gap-4 sm:gap-6">
          <div className="flex-1 min-w-[200px] sm:min-w-[300px]">
            <label htmlFor="fullname" className="block text-sm sm:text-base font-medium text-gray-700">
              Your Full Name*
            </label>
            <input
              id="fullname"
              type="text"
              defaultValue="Vathana Y"
              className="mt-2 w-full p-3 sm:p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-lg"
            />
          </div>
          <div className="min-w-[200px] sm:min-w-[300px]">
            <label htmlFor="gender" className="block text-sm sm:text-base font-medium text-gray-700">
              Gender*
            </label>
            <input
              id="gender"
              type="text"
              defaultValue="F"
              className="mt-2 w-full p-3 sm:p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-lg"
            />
          </div>
        </div>

        {/* Phone or Email */}
        <div>
          <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-700">
            Phone Number / Email*
          </label>
          <input
            id="phone"
            type="text"
            defaultValue="086 592 729"
            className="mt-2 w-full p-3 sm:p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-lg"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700">
            Password*
          </label>
          <input
            id="password"
            type={passwordVisible ? "text" : "password"}
            defaultValue="CHANTHA1122"
            className="mt-2 w-full p-3 sm:p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-lg"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-4 flex items-center"
          >
            <img
              src={passwordVisible ? eyeSlashIcon : eyeIcon}
              alt="Toggle visibility"
              className="h-5 sm:h-6 w-5 sm:w-6 mt-5 sm:mt-6"
            />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
