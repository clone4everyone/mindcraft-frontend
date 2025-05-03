import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CodeEditor = () => {
  const [text, setText] = useState('');
  const [showResult, setShowResult] = useState(false);
  
  const promptText = "Create a test suite for a user authentication system with login, signup and password reset functions.";

  const testCode = `// Generated Test Suite
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { login, signup, resetPassword } from './auth';
import { mockUserDB } from './test-utils';

describe('Authentication System', () => {
  beforeEach(() => {
    mockUserDB.clear();
  });

  describe('Login', () => {
    it('should successfully log in a user with valid credentials', async () => {
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
      await expect(login(testUser.email, 'WrongPassword123!'))
        .rejects.toThrow('Invalid credentials');
    });

    it('should reject login for non-existent user', async () => {
      // Act & Assert
      await expect(login('nonexistent@example.com', 'Password123!'))
        .rejects.toThrow('User not found');
    });
  });

  describe('Signup', () => {
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

    it('should reject signup with existing email', async () => {
      // Arrange
      const existingUser = { email: 'existing@example.com', password: 'Password123!' };
      await mockUserDB.createUser(existingUser);
      
      // Act & Assert
      await expect(signup({ ...existingUser, name: 'Another Name' }))
        .rejects.toThrow('Email already in use');
    });
  });

  // More tests...
});`;

  useEffect(() => {
    if (text.length < promptText.length) {
      const timeout = setTimeout(() => {
        setText(promptText.slice(0, text.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (!showResult) {
      const timeout = setTimeout(() => {
        setShowResult(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [text, showResult]);

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-dark-800 dark:bg-dark-900 p-2 border-b border-dark-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-dark-200">prompt-test-generator.js</div>
        <div></div>
      </div>
      
      <div className="bg-dark-800 dark:bg-dark-900 text-white p-4 font-mono text-sm h-96 overflow-auto">
        <div className="mb-4">
          <span className="text-purple-400">&gt;</span> <span className="text-green-400">Prompt</span>: <span className="typing-animation">{text}</span>
        </div>
        
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <span className="text-purple-400">&gt;</span> <span className="text-blue-400">Generating tests...</span>
            </div>
            
            <motion.pre 
              className="text-gray-300 whitespace-pre-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <code>{testCode}</code>
            </motion.pre>
            
            <motion.div 
              className="mt-4 text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 3 }}
            >
              <span className="text-purple-400">&gt;</span> Test suite generated successfully! 15 tests created across 3 modules.
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;