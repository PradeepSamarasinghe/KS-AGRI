import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Phone, 
  Mail, 
  ChevronDown,
  Facebook,
  Youtube,
  Twitter
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const mainNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about' },
    { name: 'Products', href: '/products',},
    { name: 'Contact Us', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main Header - CR Exports Style */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-sm py-2' 
            : 'bg-black/70 backdrop-blur-sm py-3'
        }`}
        style={{
          backgroundImage: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}
      >
        <div className="container mx-auto px-4">
          {/* Contact Info & Social - Top Row */}
          <div className="hidden lg:flex justify-end items-center space-x-6 text-white text-xs mb-2">
            {/* Contact Numbers */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone size={12} />
                <span>+94 77 568 9783</span>
              </div>
              <div className="text-white/60">|</div>
              <div className="flex items-center space-x-1">
                <Phone size={12} />
                <span>+94 77 768 1727</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-1">
              <Mail size={12} />
              <span>ksgroup@sltnet.lk</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              <a href="#" className="text-white hover:text-blue-400 transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="text-white hover:text-red-400 transition-colors">
                <Youtube size={14} />
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {/* Main Navigation Row */}
          <div className="flex justify-between items-center">
            
            {/* Logo Section - Left Side */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                {/* Globe-style logo similar to CR Exports */}
                <div className="w-14 h-14 border-2 border-white rounded-full flex items-center justify-center bg-transparent">
                  <div className="relative w-10 h-10">
                    {/* Globe wireframe design */}
                    <div className="absolute inset-0 border-2 border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white"></div>
                    <div className="absolute top-1 left-1 right-1 bottom-1/2 border-t-2 border-l-2 border-r-2 border-white rounded-t-full"></div>
                    <div className="absolute bottom-1 left-1 right-1 top-1/2 border-b-2 border-l-2 border-r-2 border-white rounded-b-full"></div>
                  </div>
                </div>
              </div>
              <div className="text-white">
                <div className="text-xl md:text-2xl font-bold tracking-wider leading-tight">
                  K.S.
                </div>
                <div className="text-xl md:text-2xl font-bold tracking-wider leading-tight -mt-1">
                  AGRI
                </div>
              </div>
            </Link>

            {/* Navigation Menu - Right Side */}
            <nav className="hidden lg:flex items-center space-x-8">
              {mainNavLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {('dropdownItems' in link && Array.isArray(link.dropdownItems)) ? (
                    <>
                      <button
                        className={`flex items-center space-x-1 text-white hover:text-teal-400 transition-all duration-300 text-lg font-medium italic ${
                          location.pathname.startsWith('/products') ? 'text-teal-400' : ''
                        }`}
                        onMouseEnter={() => setIsProductsMenuOpen(true)}
                        onMouseLeave={() => setIsProductsMenuOpen(false)}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div 
                        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 transition-all duration-300 ${
                          isProductsMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                        }`}
                        onMouseEnter={() => setIsProductsMenuOpen(true)}
                        onMouseLeave={() => setIsProductsMenuOpen(false)}
                      >
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      className={`text-white hover:text-teal-400 transition-all duration-300 text-lg font-medium italic ${
                        isActive(link.href) ? 'text-teal-400' : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* User Menu in Navigation */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-white hover:text-teal-400 transition-all duration-300"
                  >
                    <User size={20} />
                    <span className="text-lg font-medium italic">{user.firstName}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={16} className="mr-3" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-6">
                  <Link
                    to="/login"
                    className="text-white hover:text-teal-400 transition-all duration-300 text-lg font-medium italic"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-black/90 backdrop-blur-sm rounded-xl p-4 space-y-4 border border-white/20">
              
              {/* Mobile Contact Info */}
              <div className="pb-4 border-b border-white/20">
                <div className="space-y-2 text-white text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone size={14} />
                    <span>+94 33 222 4961</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={14} />
                    <span>ksgroup@sltnet.lk</span>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {mainNavLinks.map((link) => (
                  <div key={link.name}>
                    {'dropdownItems' in link && Array.isArray(link.dropdownItems) ? (
                      <div className="space-y-2">
                        <div className="text-white font-medium italic text-lg px-3 py-2">
                          {link.name}
                        </div>
                        <div className="pl-4 space-y-1">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="flex items-center text-white/80 hover:text-green-400 px-3 py-2 rounded-lg transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.href}
                        className={`block px-3 py-2 rounded-lg font-medium italic text-lg transition-colors ${
                          isActive(link.href)
                            ? 'text-green-400'
                            : 'text-white hover:text-green-400'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile User Section */}
              <div className="pt-4 border-t border-white/20">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2 text-white">
                      <User size={18} />
                      <div>
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-xs text-white/60">{user.email}</div>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center text-white/80 hover:text-green-400 px-3 py-2 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={16} className="mr-3" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center w-full text-left text-white/80 hover:text-green-400 px-3 py-2 rounded-lg transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block text-center px-3 py-2 rounded-lg font-medium text-white hover:text-green-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/register"
                      className="block text-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      REGISTER
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Social Media */}
              <div className="flex justify-center space-x-4 pt-4 border-t border-white/20">
                <a href="#" className="text-white hover:text-blue-400 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="#" className="text-white hover:text-blue-300 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;