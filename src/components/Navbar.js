import React, { useEffect, useState } from 'react';
import logo from '../assets/LOGO2_circle1.png';
import logo_name from '../assets/LOGO2_name.png';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for the hamburger menu

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For toggling the menu on small screens
  const [isSmWindow, setIsSmWindow] = useState(false);

  const handleScreen = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false); // Close menu on small screens resize
    }
    if(window.innerWidth <= 360) {
      setIsSmWindow(true);
    }
    else{
      setIsSmWindow(false);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleScreen);
    return () => window.removeEventListener('resize', handleScreen);
  }, []);

  return (
    <nav className={`fixed z-10 text-center flex items-center justify-between mx-auto py-4 w-full h-20 ${!isScrolled ? 'bg-black' : 'bg-transparent'} rounded-b transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center justify-center">
          <img src={logo} alt="Company Logo" className={`${isSmWindow ? 'h-8' : 'h-12'} w-auto py-auto ${isScrolled ? 'hidden' : 'block'} transition-all duration-300`} />
          {/* LOGO_name Image Responsive Sizing */}
          <img 
            src={logo_name} 
            alt="Company Name" 
            className={`company-name  ${isSmWindow ? 'h-6' : 'h-11'} w-auto rounded-md transition-all duration-300 ${isScrolled ? 'hidden ' : 'block'} `} // Adjust size based on screen size
          />
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className={`${!isScrolled ? 'text-white': ' text-black' } focus:outline-none`}>
            {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />} {/* Hamburger / Close Icon */}
          </button>
        </div>

        {/* Links for Larger Screens */}
        <ul className={`hidden sm:flex items-center justify-center px-12 ${isScrolled ? 'mx-auto' : 'mx-0'} space-x-6`}>
          <li><a href="#" className={`px-2 text-lg ${!isScrolled ? 'text-gray-100' : 'text-white'} hover:text-orange-300 transition-colors font-bold`}>Home</a></li>
          <li><a href="#description" className={`px-2 text-lg ${!isScrolled ? 'text-gray-100' : 'text-white'} hover:text-orange-300 transition-colors font-bold`}>About</a></li>
          <li><a href="#contact" className={`px-2 text-lg ${!isScrolled ? 'text-gray-100' : 'text-white'} hover:text-orange-300 transition-colors font-bold`}>Contact</a></li>
        </ul>

        {/* Slide-in Menu for Small Screens */}
        <div className={`fixed top-0 right-0 w-2/3 h-full bg-black text-white transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-white">
              <FaTimes size={30} /> {/* Close Icon */}
            </button>
          </div>
          <ul className="flex flex-col items-center space-y-6 mt-10">
            <li><a href="#" className="text-lg hover:text-gray-400" onClick={toggleMenu}>Home</a></li>
            <li><a href="#description" className="text-lg hover:text-gray-400" onClick={toggleMenu}>About</a></li>
            <li><a href="#contact" className="text-lg hover:text-gray-400" onClick={toggleMenu}>Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
