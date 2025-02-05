import React from "react";
import { useNavigate } from 'react-router-dom';

import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";
import logo from "../image/logo-rbg.png"
import Button from "../components/button";

const Footer = () => {
  const navigate = useNavigate(); 
  
  return (
    <footer className="bg-white shadow pt-[10px]">
      <div className="container mx-auto lgm:px-[4rem] px-6 mt-[2rem]">
        {/* Footer Content */}
        <div className="flex flex-wrap justify-between items-start">
          {/* Logo Section */}
          <div className="mb-6 sm:mb-0">
            <img
              src={logo}
              alt="Namplov"
              className="w-24 ml-[1rem]"
            />
            <p className="text-logocolor font-semibold">Find Us in Social :</p>
            <div className="flex space-x-4 mt-2 text-blue">
              <FaFacebookF className="hover:text-blue-900 cursor-pointer" />
              <FaInstagram className="hover:text-blue-900 cursor-pointer" />
              <FaYoutube className="hover:text-blue-900 cursor-pointer" />
              <FaEnvelope className="hover:text-blue-900 cursor-pointer" />
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-3 gap-8 text-blue-700">
            {/* Test Section */}
            <div>
              <h3 className="font-bold text-logocolor mb-4">Test</h3>
              <ul className="space-y-2">
                <li className="hover:text-logocolor cursor-pointer">Major Recommend</li>
                <li className="hover:text-logocolor cursor-pointer">IQ Test</li>
                <li className="hover:text-logocolor cursor-pointer">Personality Test</li>
              </ul>
            </div>

            {/* News Section */}
            <div>
              <h3 className="font-bold text-logocolor mb-4">News</h3>
              <ul className="space-y-2">
                <li className="hover:text-logocolor cursor-pointer">Universities</li>
                <li className="hover:text-logocolor cursor-pointer">Scholarship</li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="font-bold text-blue-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li className="hover:text-blue-900 cursor-pointer">About Us</li>
                <li className="hover:text-blue-900 cursor-pointer">Online Learning</li>
              </ul>
            </div>
          </div>

          {/* Online Learning Button */}
          <div className="mt-6 sm:mt-0">
            <Button
            label="Go Back"
            onClick={() => navigate('/')}
            >
              Online Learning
            </Button>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="border-t border-logocolor mt-[1rem] flex items-center justify-center min-h-[3rem]">
          <p className="text-logocolor font-semibold ">Turning Ambition into Action</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
