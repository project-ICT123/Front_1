import React, { useState } from "react";

const MyPhoto = () => {
  const [image, setImage] = useState(null); // State to hold the selected image
  const [fileName, setFileName] = useState("No file selected"); // File name for display

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Update file name
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result); // Convert file to Base64 URL
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (image) {
      alert("Photo saved successfully!"); // Placeholder for save functionality
      // Add your save logic here (e.g., API call)
    } else {
      alert("Please upload a photo before saving.");
    }
  };

  const handleRemove = () => {
    setImage(null); // Reset image
    setFileName("No file selected"); // Reset file name
    alert("Photo removed successfully.");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-full">
      <h2 className="lg:text-2xl md:text-xl text-sm font-semibold mb-4 text-center">Upload Your Photo</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Add a nice photo of yourself for your profile.
      </p>
      <div className="space-y-6">
        {/* Image Preview Section */}
        <div className="border border-gray-300 p-4 rounded-md">
          <p className="text-sm text-gray-500 mb-2 text-center">Image Preview</p>
          <div className="w-full h-64 sm:h-96 flex items-center justify-center rounded-md overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">No image selected</span>
              
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <label
            htmlFor="file-upload"
            className="bg-blue-600 text-white text-xs md:text-sm lg:text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="text-sm text-gray-500">{fileName}</p>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 text-sm rounded-md hover:bg-red-700 transition-all w-full sm:w-auto"
            onClick={handleRemove}
          >
            Remove Photo
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-700 transition-all w-full sm:w-auto"
            onClick={handleSave}
          >
            Save Photo
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyPhoto;
