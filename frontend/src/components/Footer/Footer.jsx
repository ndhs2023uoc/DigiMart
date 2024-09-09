import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">DigiMark</h2>
            <p className="text-sm">
              Empowering your journey with Digital Marketing.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/classes"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link
                  to="/instructors"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Instructors
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">123 Yoga Street, Zen City</p>
            <p className="text-sm">Email: info@DigiMark.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-sm">&copy; 2023 DigiMark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
