import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const homepage=()=>{
  window.location.href = '/';
 
}
const Logo = () => (
  
  <motion.div 
    className="flex items-center justify-center py-6 "
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.5 }}
    
  >
    <div className="flex items-center space-x-2 hover:cursor-pointer" onClick={() => homepage()}>
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M4.649 3.084A1 1 0 015.163 4.4 13.95 13.95 0 004 10c0 1.993.416 3.886 1.164 5.6a1 1 0 01-1.832.8A15.95 15.95 0 012 10c0-2.274.475-4.44 1.332-6.4a1 1 0 011.317-.516zM12.96 7a3 3 0 00-2.342 1.126l-.328.41-.111-.279A2 2 0 008.323 7H8a1 1 0 000 2h.323l.532 1.33-1.035 1.295a1 1 0 01-.781.375H7a1 1 0 100 2h.039a3 3 0 002.342-1.126l.328-.41.111.279A2 2 0 0011.677 14H12a1 1 0 100-2h-.323l-.532-1.33 1.035-1.295A1 1 0 0112.961 9H13a1 1 0 100-2h-.039zm1.874-2.6a1 1 0 011.833-.8A15.95 15.95 0 0118 10c0 2.274-.475 4.44-1.332 6.4a1 1 0 11-1.832-.8A13.949 13.949 0 0016 10c0-1.993-.416-3.886-1.165-5.6z" clipRule="evenodd" />
      </svg>
      <span className="text-xl font-bold text-gray-800">MindCraft</span>
    </div>
  </motion.div>
);

const MenuItem = ({ to, icon, label, delay }) => (
  <motion.div
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: delay * 0.1 + 0.3, duration: 0.5 }}
  >
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center space-x-2 px-4 py-3 my-2 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
            : 'text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      {icon}
      <span>{label}</span>
      {to === "/user/new" && (
        <motion.span
          className="flex h-6 w-6 ml-auto items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-xs text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay * 0.1 + 0.5, type: "spring", stiffness: 200 }}
        >
          +
        </motion.span>
      )}
    </NavLink>
  </motion.div>
);

const SideBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex flex-col h-full">
      <Logo />
      
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <MenuItem 
          to="/user/new" 
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          } 
          label="New Test" 
          delay={1}
        />
        
        <MenuItem 
          to="/user/collection" 
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          } 
          label="Collection" 
          delay={2}
        />
        
        {/* <MenuItem 
          to="/user/settings" 
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          } 
          label="Settings" 
          delay={3}
        /> */}
      </div>
      
      {/* User profile section */}
      {/* <motion.div
        className="border-t border-gray-200 p-4 mt-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
          <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
    
      </motion.div> */}
      
    </div>
  );
};

export default SideBar;