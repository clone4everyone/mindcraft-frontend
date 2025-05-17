import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CodeEditor = () => {
  const [text, setText] = useState('');
  const [showResult, setShowResult] = useState(false);
  
  const promptText = "Karan Rawat ";

  const testCode = `Welcome to MindCraft, where we simplify learning and testing through the power of AI.

At MindCraft, we believe that assessments should be smart, fast, and effortless. That’s why we’ve built a prompt-based test generation platform that empowers students and educators alike. Just enter a topic or prompt—our intelligent system will instantly create a comprehensive, well-structured test designed to evaluate understanding and boost knowledge retention.

Whether you're preparing for exams or creating quizzes for classroom use, MindCraft saves time, eliminates manual effort, and delivers quality assessments tailored to your needs.

Our mission is to make learning more engaging and accessible by leveraging advanced technology to turn ideas into assessments—instantly.

Join us in transforming the way we test and learn.`;

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
        <div className="text-xs text-dark-200">About Website</div>
        <div></div>
      </div>
      
      <div className="bg-dark-800 dark:bg-dark-900 text-white p-4 font-mono text-sm h-96 overflow-auto">
        <div className="mb-4">
          <span className="text-purple-400">&gt;</span> <span className="text-green-400">Founder</span>: <span className="typing-animation">{text}</span>
        </div>
        
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <span className="text-purple-400">&gt;</span> <span className="text-blue-400">Website Goal...</span>
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
              <span className="text-purple-400">&gt;</span> Contact : karanrawat9149@gmail.com
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;