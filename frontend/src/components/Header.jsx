import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, User, LogOut, LogIn, UserPlus, Home, Wrench, Info, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

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

  const handleBookingClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-white/90" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left - Menu Button */}
            <div className="w-[100px] flex justify-start">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="relative rounded-xl hover:bg-gray-50 w-10 h-10 flex items-center justify-center"
              >
                <Menu className="w-5 h-5 text-gray-800" />
              </Button>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <Link to="/" className="relative group">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-16 h-16 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Right - Actions */}
            <div className="w-[100px] flex items-center justify-end space-x-4">
              {/* Book Now Button */}
              <div className="hidden md:block">
                <Link 
                  to={isLoggedIn ? "/booking-service" : "/login"}
                  onClick={handleBookingClick}
                >
                  <Button className="bg-red-600 hover:bg-red-900 text-white font-medium px-6 rounded-full transition-all">
                    Book Now
                  </Button>
                </Link>
              </div>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleUserDropdown}
                  className="relative rounded-xl hover:bg-gray-50 w-10 h-10 flex items-center justify-center"
                >
                  <User className="w-5 h-5 text-black" />
                </Button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-gray-200 shadow-lg z-50 overflow-hidden">
                    {isLoggedIn ? (
                      <button
                        className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-3 text-gray-800 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <LogIn className="w-4 h-4" />
                          <span>Login</span>
                        </Link>
                        <Link
                          to="/signup"
                          className="block px-4 py-3 text-gray-800 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
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

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 z-50 bg-black/50"
              onClick={toggleSidebar}
            />
            
            {/* Sidebar */}
            <div 
              className={cn(
                "fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-white shadow-xl",
                "transform transition-transform duration-300 ease-in-out",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              )}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <span className="text-lg font-semibold text-gray-900">
                  Menu
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="text-gray-800 hover:bg-gray-50 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Sidebar Navigation */}
              <nav className="p-6 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
                      onClick={toggleSidebar}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}

                <div className="pt-4">
                  <Link 
                    to={isLoggedIn ? "/booking-service" : "/login"}
                    onClick={(e) => {
                      toggleSidebar();
                      handleBookingClick(e);
                    }}
                  >
                    <Button className="w-full bg-red-600 hover:bg-red-900 text-white font-medium rounded-full transition-all">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;