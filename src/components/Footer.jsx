import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing social media icons

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Left Section: Contact Information */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
            <h2 className="text-xl font-bold mb-4 sm:mb-0">MNK-Book-Event</h2>
            <div className="text-sm sm:ml-8">
              <p>Contact Us: <a href="mailto:info@bookevent.com" className="underline">mnk@bookevent.com</a></p>
              <p>Phone: <a href="tel:+123456789" className="underline">+91 7609809303</a></p>
            </div>
          </div>

          {/* Right Section: Social Media Links */}
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="text-center mt-6 text-sm">
          <p>&copy; {new Date().getFullYear()} Book-Event. All rights reserved.asiskumardandapat90@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
