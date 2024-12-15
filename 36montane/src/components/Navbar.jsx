import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define link styles for active/inactive states
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-white bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 px-3 py-2 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out'
      : 'text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out';

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex flex-1 items-center justify-between md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4 group" to="/home">
              <img
                className="h-10 w-auto transition-all duration-300 ease-in-out group-hover:scale-105"
                src="https://cbbstwltufvzpsqvnahz.supabase.co/storage/v1/object/public/avatars/public/logoipsum.png"
                alt="36 Montane"
              />
              <span className="hidden md:block text-white text-2xl font-semibold ml-2 transition-all duration-300 ease-in-out group-hover:text-gray-400">
                36 Montane
              </span>
            </NavLink>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 ml-auto">
              <NavLink to="/home" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/gallery" className={linkClass}>
                Gallery
              </NavLink>
              <NavLink to="/service" className={linkClass}>
                Services
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Links */}
        <div
          className={`md:hidden bg-gray-700 p-6 space-y-4 transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <NavLink onClick={handleLinkClick} to="/home" className={linkClass}>
            Home
          </NavLink>
          
          <NavLink onClick={handleLinkClick} to="/gallery" className={linkClass}>
            Gallery
          </NavLink>

          <NavLink onClick={handleLinkClick} to="/service" className={linkClass}>
            Services
          </NavLink>
          <NavLink onClick={handleLinkClick} to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink onClick={handleLinkClick} to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
