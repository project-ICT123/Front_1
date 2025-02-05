import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./components/Slidebar";
import ProfileInfo from "./components/proInfo";
import MyPhoto from "./components/Myphoto";
import MyResultTest from "./components/Myresult";
import { FaArrowLeft } from "react-icons/fa";

const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState("Profile Info");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for Medium and Larger Screens */}
      <div className="hidden md:block bg-blue-900 text-white w-64 md:w-1/4">
        <Sidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          profilePicture={profilePicture}
          onProfilePictureChange={handleProfilePictureChange}
        />
      </div>

      {/* Horizontal Navigation for Smaller Screens */}
      <div className="block md:hidden bg-blue-600 text-white sticky top-0 z-10">
        <div className="flex justify-around space-x-2 py-4">
          {["Profile Info", "My Photo", "My Result Test", "Logout"].map(
            (section, index) => (
              <button
                key={index}
                className={`px-2 py-2 text-xs rounded ${
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

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 p-4 md:p-8">
      <Link to="/">
              <button
                type="button"
                className="m-1 md:m-2 lg:m-4 xl:m-4 text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[10px] sm:lg:text-[12px] md:text-[12px] lg:text-[12px] xl:text-md px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-2 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Go Back
              </button>
            </Link>
            
        {selectedSection === "Profile Info" && <ProfileInfo />}
        {selectedSection === "My Photo" && <MyPhoto />}
        {selectedSection === "My Result Test" && <MyResultTest />}
      </div>
    </div>
  );
};

export default ProfilePage;