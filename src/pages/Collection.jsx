import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../utils/API';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Collection = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        if (isLoaded && user) {
          const response = await API.post("/api/v1/gemini/getUserTests", {
            clerkId: user.id
          });
          console.log(response)
          // Transform the data into the format needed for the cards
          const formattedTests = response.data.tests
            .filter(test => test.moduleData && test.moduleData.length > 0)
            .map(test => ({
              id: test._id,
              title: test.moduleName,
              description: `A collection of ${test.moduleData.length} questions on various topics.`,
              status: test.moduleData.length > 0 ? 'completed' : 'draft',
              date: test.createdAt,
              questions: test.moduleData.length,
              testType: 'Multiple Choice',
              difficultyLevel: getDifficultyLevel(test.moduleData),
              color: getColorByDifficulty(getDifficultyLevel(test.moduleData)),
              score: calculateScore(test.moduleData)
            }));
          
          setTests(formattedTests);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
        setLoading(false);
      }
    };

    if (isLoaded) {
      fetchTests();
    }
  }, [isLoaded, user]);

  // Calculate the overall difficulty level based on questions
  const getDifficultyLevel = (questions) => {
    if (!questions || questions.length === 0) return 'easy';
    
    const difficultyCounts = questions.reduce((acc, q) => {
      acc[q.level] = (acc[q.level] || 0) + 1;
      return acc;
    }, {});
    
    // Determine predominant difficulty
    let maxCount = 0;
    let predominantDifficulty = 'easy';
    
    for (const [difficulty, count] of Object.entries(difficultyCounts)) {
      if (count > maxCount) {
        maxCount = count;
        predominantDifficulty = difficulty;
      }
    }
    
    return predominantDifficulty;
  };

  // Get color based on difficulty
  const getColorByDifficulty = (difficulty) => {
    switch(difficulty) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'hard':
        return 'red';
      default:
        return 'blue';
    }
  };

  // Calculate a mock score for display purposes
  const calculateScore = (questions) => {
    if (!questions || questions.length === 0) return 0;
    
    // For now, let's just show a number between 75-95 for completed tests
    return Math.floor(Math.random() * 20) + 75;
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  // Animations
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
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  // Filter tests based on search term
  const filteredTests = tests.filter(test => {
    if (searchTerm) {
      return test.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  }).filter(test => {
    if (filter === 'all') return true;
    return test.status === filter;
  });
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading your tests...</p>
        </motion.div>
      </div>
    );
  }
  const gotoInstructionPage = (userId, testId) => {
    navigate(`/test-instruction/${userId}/${testId}`)
  }
  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Tests</h1>
          <p className="text-gray-600 mt-1">Manage and review your generated tests</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tests..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            onClick={() => window.location.href = '/user/new'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Create New</span>
          </motion.button>
        </div>
      </motion.div>
      
      <motion.div 
        className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center"
        variants={itemVariants}
      >
        {/* <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${filter === 'completed' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${filter === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setFilter('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${filter === 'draft' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setFilter('draft')}
          >
            Drafts
          </button>
        </div> */}
        
        <div className="flex items-center space-x-2">
          <button 
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </button>
          <button 
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </motion.div>
      
      {filteredTests.length === 0 ? (
        <motion.div 
          className="bg-white rounded-xl shadow-md p-8 text-center"
          variants={itemVariants}
        >
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-800">No tests found</h3>
          <p className="mt-2 text-gray-600">Give it a try and Start making Test from promt...</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={() => window.location.href = '/user/new'}
          >
           Create New Test
          </button>
        </motion.div>
      ) : viewMode === 'grid' ? (
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {filteredTests.map((test) => (
              <motion.div
                key={test.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-${test.color}-500 hover:shadow-lg transition-shadow`}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => gotoInstructionPage(user.id,test.id)}
                layout
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{test.title}</h3>
                    {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(test.status)}`}>
                      {test.status === 'completed' ? 'Completed' : test.status === 'in-progress' ? 'In Progress' : 'Draft'}
                    </span> */}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{test.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>{new Date(test.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{test.questions} questions</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-gray-500">Test Type:</span>
                      <span className="ml-1 text-xs text-gray-700 capitalize">{test.testType}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">Difficulty:</span>
                      <span className="ml-1 text-xs text-gray-700 capitalize">{test.difficultyLevel}</span>
                    </div>
                  </div>
                  
                 
                </div>
                
                <div className="bg-gray-50 px-6 py-3 flex justify-between">
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    onClick={() => gotoInstructionPage(user.id,test.id)}
                  >
                 Take Test
                  </button>
                  {/* <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    Duplicate
                  </button> */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
          >
            {filteredTests.map((test) => (
              <motion.div
                key={test.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                layout
              >
                <div className="flex flex-col md:flex-row">
                  <div className={`w-2 md:w-2 bg-${test.color}-500 hidden md:block`}></div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-gray-800">{test.title}</h3>
                          {/* <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(test.status)}`}>
                            {test.status === 'completed' ? 'Completed' : test.status === 'in-progress' ? 'In Progress' : 'Draft'}
                          </span> */}
                        </div>
                        <p className="text-gray-600 text-sm mt-1 md:pr-12">{test.description}</p>
                      </div>
                      
            
                    </div>
                    
                    <div className="flex flex-wrap items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center mr-4 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{new Date(test.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center mr-4 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{test.questions} questions</span>
                      </div>
                      <div className="flex items-center mr-4 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="capitalize">{test.testType}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <span className="capitalize">{test.difficultyLevel}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 md:p-6 flex md:flex-col justify-between items-center md:items-stretch md:w-48 md:border-l border-gray-100">
                    <button 
                      className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm w-full mb-0 md:mb-3"
                      onClick={() => window.location.href = `/user/test/${test.id}`}
                    >
                      Take Test
                    </button>
                   
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
      
      {filteredTests.length > 0 && (
        <motion.div 
          className="mt-8 text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          Showing {filteredTests.length} of {tests.length} tests
        </motion.div>
      )}
    </motion.div>
  );
};

export default Collection;