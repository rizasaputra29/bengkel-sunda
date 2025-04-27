import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, User, LogOut, LogIn, UserPlus, Home, Wrench, Info, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Wrench },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsUserDropdownOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b border-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="relative rounded-full hover:bg-gray-800/50"
            >
              <Menu className="w-5 h-5 text-gray-300 hover:text-cyan-400" />
            </Button>

            {/* Center - Logo & Nav */}
            <div className="flex flex-col items-center flex-1">
              <Link to="/" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                <h1 className="relative text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Bengkel Sunda
                </h1>
              </Link>
            </div>

            {/* Right - User Menu */}
            <div className="flex items-center space-x-4">
              {/* Book Now Button - Hidden on mobile */}
              <div className="hidden md:block">
                <Link to="/booking-service" >
                <Button className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-200">
                  <span className="relative z-10">Book Now</span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </Button>
                </Link>
              </div>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleUserDropdown}
                  className="relative rounded-full hover:bg-gray-800/50"
                >
                  <User className="w-5 h-5 text-gray-300 hover:text-cyan-400" />
                </Button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg backdrop-blur-lg bg-gray-800/90 border border-gray-700 shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
                    {isLoggedIn ? (
                      <button
                        className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700/50 flex items-center space-x-2 transition-colors"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className=" px-4 py-3 text-gray-300 hover:bg-gray-700/50 flex items-center space-x-2 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <LogIn className="w-4 h-4" />
                          <span>Login</span>
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 text-gray-300 hover:bg-gray-700/50 flex items-center space-x-2 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Sign Up</span>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleSidebar}
          />
          
          <div className={cn(
            "fixed top-0 left-0 h-full w-72 bg-gray-900/95 border-r border-gray-800/50 backdrop-blur-md transform transition-transform duration-300 ease-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
              <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Menu
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="text-gray-300 hover:text-cyan-400"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center space-x-3 p-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-all"
                    onClick={toggleSidebar}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-200">
                  Book Now
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;