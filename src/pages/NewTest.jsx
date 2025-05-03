import React, { useState } from 'react';
import { motion } from 'framer-motion';
import API from '../utils/API';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const NewTest = () => {
  const { user, isSignedIn } = useUser();
const navigate=useNavigate()
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(300); // Default to 5 minutes (300 seconds)
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setIsSubmitting(true);
    
    const data = await API.post('/api/v1/gemini/create', { 
      prompt, 
      clerkId: user.id,
      durationSeconds: duration 
    });  
    // Reset form or redirect to generated test
   
    if (localStorage.getItem('prompts')) {
      let prompts = JSON.parse(localStorage.getItem('prompts')); 
      prompts.push(prompt);
      localStorage.setItem('prompts', JSON.stringify(prompts));
    } else {
      let prompts = [prompt];
      localStorage.setItem('prompts', JSON.stringify(prompts));
    }
    
    setIsSubmitting(false);
    toast.success("Test Created");
    navigate("/user/collection")
    // Redirect or show success would go here
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // Duration options in minutes and their corresponding seconds
  const durationOptions = [
    { label: '5 minutes', value: 300 },
    { label: '10 minutes', value: 600 },
    { label: '15 minutes', value: 900 },
    { label: '20 minutes', value: 1200 },
    { label: '25 minutes', value: 1500 },
    { label: '30 minutes', value: 1800 },
    { label: '40 minutes', value: 2400 },
    { label: '45 minutes', value: 2700 }
  ];
  
  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 ml-11 md:ml-0">Create New Test</h1>
        <p className="text-gray-600 mt-2">Provide a prompt and we'll generate a custom test for you.</p>
      </motion.div>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        variants={itemVariants}
      >
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Your Prompt
          </label>
          <div className="relative">
            <textarea
              id="prompt"
              rows={5}
              className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Enter your prompt here. Be specific about the topic, concepts, and knowledge areas you want to test..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-500">
              {prompt.length} characters
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Examples: "Create a test on photosynthesis for high school biology" or "Generate questions about JavaScript ES6 features for web developers"</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-1 gap-6"
          variants={itemVariants}
        >
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Test Duration
            </label>
            <select
              id="duration"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-black focus:border-blue-500 transition-colors bg-white"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            >
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
        
        <motion.div
          className="pt-4"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            type="submit"
            disabled={isSubmitting || !prompt.trim() || prompt.trim().length < 11}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 ${
              isSubmitting || !prompt.trim() || prompt.trim().length < 20
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating Your Test...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>Generate Test</span>
              </>
            )}
          </button>
        </motion.div>
      </motion.form>
      {
        JSON.parse(localStorage.getItem('prompts')) &&     <motion.div
        className="mt-12"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JSON.parse(localStorage.getItem('prompts'))?.map((examplePrompt, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md cursor-pointer transition-all"
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={() => setPrompt(examplePrompt)}
            >
              <p className="text-gray-700 truncate">{examplePrompt}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">3 days ago</span>
                <button className="text-xs text-blue-600 hover:text-blue-800">Use This</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      }
  
    </motion.div>
  );
};

export default NewTest;