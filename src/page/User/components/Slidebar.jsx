import React from "react";
import { FaCamera } from "react-icons/fa";

const Sidebar = ({ selectedSection, setSelectedSection, profilePicture, onProfilePictureChange }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative group">
        <img
          src={profilePicture || "default-profile.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover cursor-pointer border-4 border-blue-900"
          onClick={() => document.getElementById("profilePictureInput").click()}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <FaCamera className="text-white text-2xl" />
        </div>
        <input
          type="file"
          id="profilePictureInput"
          accept="image/*"
          className="hidden"
          onChange={onProfilePictureChange}
        />
      </div>
      <div className="mt-4">
        {["Profile Info", "My Photo", "My Result Test", "Logout"].map(
          (section, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-2 mt-2 rounded ${
                selectedSection === section
                  ? "bg-white text-blue-900 font-bold"
                  : "text-white hover:bg-blue-700"
              }`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;