import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo-rbg.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isDropdownOpens, setIsDropdownOpens] = useState(false);
  const dropdownRefs = useRef(null);

  const handleDropdownClicks = () => {
    setIsDropdownOpens(!isDropdownOpens);
  };

  const menuRef = useRef(null);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefs.current && !dropdownRefs.current.contains(event.target)) {
        setIsDropdownOpens(false); // Close the dropdown
      }
    };

    // Listen for clicks outside of the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownItems = [
    { path: "/major_test", label: "Major Recommend" },
    { path: "/iq_test", label: "IQ Test" },
    { path: "/personality_test", label: "Personality Test" },
  ];



  return (
    <nav className="bg-white shadow px-[1rem] h-[5rem] flex items-center">
      <div className="flex justify-between items-center w-full">
        {/* Logo Section */}
        <div className="flex items-center ml-[-1rem]">
          <Link to="/">
            <img
              src={logo}
              alt="Namplov Logo"
              className="w-[70px] md:w-[80px] lg:w-[100px]"
            />
          </Link>
          <Link to="/">
            <span className="ml-[-5px] text-logocolor font-bold text-xl">Namplov</span>
          </Link>
          
        </div>

        {/* Desktop Links */}
        <div className="hidden lgm:flex items-center space-x-6 text-logocolor">
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center hover:text-pink text-[18px]"
              onClick={handleDropdownClick}
            >
              Test <span className="ml-1">▼</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white shadow rounded w-[200px] z-50">
                <div className="py-1">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-left hover:bg-blue-100 hover:text-pink"
                      onClick={() => setIsDropdownOpen(false)}  // Close the dropdown when the link is clicked
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/universities" className="hover:text-pink text-[18px]">
            Universities
          </Link>
          <Link to="/scholarships" className="hover:text-pink text-[18px]">
            Scholarship
          </Link>
          <Link to="/online_learning" className="hover:text-pink text-[18px]">
            Online Learning
          </Link>
          <Link to="/youracc">
            <button className="bg-logocolor text-white px-4 py-2 rounded text-[16px]">
              Your Profile
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center hover:text-white rounded-lg lg:hidden hover:bg-logocolor focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-4/6 h-full bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 space-y-4 text-logocolor">
          <div className="flex left-0">
            <button
              className="menu-close-button "
              onClick={() => setIsMenuOpen(false)} // Close the sidebar
            >
              <svg className="flex left-0 items-start p-2 w-10 h-10 hover:text-white rounded-lg lg:hidden hover:bg-logocolor focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
              </svg>
            </button>
          </div>
          

          <div className="ml-[2rem] space-y-[1rem]">
            <div className="relative" ref={dropdownRefs}>
              <button
                className="flex items-center hover:text-pink text-[18px]"
                onClick={handleDropdownClicks}
              >
                Test <span className="ml-1">▼</span>
              </button>
              {isDropdownOpens && (
                <div className="absolute mt-2 bg-white shadow rounded w-[200px] z-50">
                  <div className="py-1">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2 text-left hover:bg-blue-100 hover:text-pink"
                        onClick={() => {
                          setIsDropdownOpens(false); // Close the dropdown
                          setIsMenuOpen(false); // Close the sidebar (mobile menu)
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/universities" className="block hover:text-pink text-left" onClick={() => setIsMenuOpen(false)}>
              Universities
            </Link>
            <Link to="/scholarships" className="block hover:text-pink text-left" onClick={() => setIsMenuOpen(false)}>
              Scholarship
            </Link>
            <Link to="/online_learning" className="block hover:text-pink text-left" onClick={() => setIsMenuOpen(false)}>
              Online Learning
            </Link>
            <Link to="/youracc">
              <button
                className="bg-logocolor text-white px-2 py-2 rounded w-full text-sm mt-3"
                onClick={() => setIsMenuOpen(false)} // Close the sidebar when clicking the button
              >
                Your Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
