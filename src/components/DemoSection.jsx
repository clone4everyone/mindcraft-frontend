import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPlayCircle, FiRefreshCw } from 'react-icons/fi';

const samplePrompts = [
  "Generate unit tests for a user authentication module with login, signup, and password reset",
  "Create test suite for a shopping cart with add, remove, and checkout functionality",
  "Write integration tests for a REST API with CRUD operations for a user profile",
  "Build e2e tests for a multi-step form with validation and form submission"
];

const DemoSection = () => {
  const [prompt, setPrompt] = useState(samplePrompts[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTests, setGeneratedTests] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleGenerate = () => {
    if (prompt.trim() === '') return;
    
    setIsGenerating(true);
    setGeneratedTests(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedTests(`// Generated Test Suite
import { describe, it, expect, beforeEach, afterEach } from 'jest';
import { login, signup, resetPassword } from './auth';
import { mockUserDB } from './test-utils';

beforeEach(() => {
  mockUserDB.clear();
});

describe('Authentication - Login', () => {
  it('should login user with valid credentials', async () => {
    // Arrange
    const testUser = { email: 'test@example.com', password: 'Password123!' };
    await mockUserDB.createUser(testUser);
    
    // Act
    const result = await login(testUser.email, testUser.password);
    
    // Assert
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
    expect(result.user.email).toBe(testUser.email);
  });

  it('should reject login with incorrect password', async () => {
    // Arrange
    const testUser = { email: 'test@example.com', password: 'Password123!' };
    await mockUserDB.createUser(testUser);
    
    // Act & Assert
    await expect(login(testUser.email, 'WrongPassword123!')).rejects.toThrow('Invalid credentials');
  });

  // More tests...
});

describe('Authentication - Signup', () => {
  it('should create a new user account successfully', async () => {
    // Arrange
    const newUser = { 
      email: 'newuser@example.com', 
      password: 'Password123!',
      name: 'New User'
    };
    
    // Act
    const result = await signup(newUser);
    
    // Assert
    expect(result.success).toBe(true);
    expect(result.user.email).toBe(newUser.email);
    expect(result.user.name).toBe(newUser.name);
  });

  // More tests...
});

// Additional test suites would be generated here...`);
    }, 2000);
  };
  
  const setRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * samplePrompts.length);
    setPrompt(samplePrompts[randomIndex]);
  };

  return (
    <section id="demo" className="section relative overflow-hidden">
      <div className="mesh-overlay"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Try It Yourself
          </motion.h2>
          <motion.p 
            className="text-dark-600 dark:text-dark-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Enter a prompt below to see how our AI generates comprehensive test suites
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <textarea 
                  className="w-full min-h-[100px] p-4 rounded-lg bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your test description here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex flex-col justify-end gap-2">
                <motion.button 
                  className="btn btn-primary flex items-center justify-center gap-2"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isGenerating ? (
                    <>
                      <FiRefreshCw className="animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <FiPlayCircle />
                      <span>Generate Tests</span>
                    </>
                  )}
                </motion.button>
                
                <motion.button 
                  className="btn btn-outline flex items-center justify-center gap-2"
                  onClick={setRandomPrompt}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiRefreshCw />
                  <span>Random Example</span>
                </motion.button>
              </div>
            </div>
            
            <div className="bg-dark-800 dark:bg-dark-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-dark-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-300">generated-tests.js</div>
                <div></div>
              </div>
              
              <div className="p-4 overflow-auto h-80">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary-500 animate-spin"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-500">
                        <FiRefreshCw className="h-8 w-8" />
                      </div>
                    </div>
                    <p className="mt-4 text-gray-300">Analyzing prompt and generating tests...</p>
                  </div>
                ) : generatedTests ? (
                  <motion.pre 
                    className="font-mono text-sm text-gray-300 whitespace-pre-wrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <code>{generatedTests}</code>
                  </motion.pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <FiPlayCircle className="h-12 w-12 mb-4" />
                    <p>Enter a prompt and click "Generate Tests" to see results</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;