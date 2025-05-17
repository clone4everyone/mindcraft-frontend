import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import Logo from './Logo';

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "Demo", href: "#demo" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Community", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-white dark:bg-dark-900 relative overflow-hidden">
      <div className="mesh-overlay opacity-5"></div>
      
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-dark-600 dark:text-dark-300 max-w-md mb-6">
              Generate tests instantly with simple prompts. 
              Save development time and ensure comprehensive test coverage with our AI-powered platform.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-dark-400 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <FiGithub className="h-6 w-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-dark-400 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <FiTwitter className="h-6 w-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-dark-400 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <FiLinkedin className="h-6 w-6" />
              </motion.a>
              <motion.a 
                href="mailto:contact@testprompt.ai" 
                className="text-dark-400 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 transition-colors"
                whileHover={{ y: -3 }}
              >
                <FiMail className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
          
          {footerLinks.map((category, i) => (
            <div key={i}>
              <h4 className="font-semibold text-lg mb-4">{category.title}</h4>
              <ul className="space-y-3">
                {category.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href={link.href} 
                      className="text-dark-500 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-dark-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-500 dark:text-dark-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MindCraft. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-dark-500 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-dark-500 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-dark-500 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;