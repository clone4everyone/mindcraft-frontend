import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';
import SignButton from './buttons/SignButton';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md ${isScrolled && 'shadow-sm'} transition-all duration-300 ease-in-out`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container-custom py-4 flex items-center justify-between">
        <motion.div variants={itemVariants} className="flex items-center">
          <Logo />
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div variants={itemVariants} className="hidden md:flex items-center space-x-8">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          {/* <a href="#pricing" className="nav-link">Pricing</a> */}
        </motion.div>

        <motion.div variants={itemVariants} className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-300"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <FaSun className="h-5 w-5 text-yellow-400" />
            ) : (
              <FaMoon className="h-5 w-5 text-dark-600" />
            )}
          </button>
          <SignButton/>
          {/* <a href="#" className="btn btn-outline">Sign In</a> */}
          {/* <a href="#" className="btn btn-primary">Get Started</a> */}
        </motion.div>

        {/* Mobile Navigation Icon */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-300"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <FaSun className="h-5 w-5 text-yellow-400" />
            ) : (
              <FaMoon className="h-5 w-5 text-dark-600" />
            )}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6 text-dark-800 dark:text-white" />
            ) : (
              <FiMenu className="h-6 w-6 text-dark-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className="md:hidden overflow-hidden"
      >
        <div className="container-custom py-4 flex flex-col space-y-4 border-t border-gray-100 dark:border-dark-700">
          <motion.a variants={mobileItemVariants} href="#features" className="nav-link py-2">
            Features
          </motion.a>
          <motion.a variants={mobileItemVariants} href="#how-it-works" className="nav-link py-2">
            How It Works
          </motion.a>
          <motion.a variants={mobileItemVariants} href="#testimonials" className="nav-link py-2">
            Testimonials
          </motion.a>
          {/* <motion.a variants={mobileItemVariants} href="#pricing" className="nav-link py-2">
            Pricing
          </motion.a> */}
          <motion.div variants={mobileItemVariants} className="flex flex-col space-y-3 pt-2">
          <SignButton/>
            {/* <a href="#" className="btn btn-outline w-full text-center">Sign In</a>
            <a href="#" className="btn btn-primary w-full text-center">Get Started</a> */}
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;