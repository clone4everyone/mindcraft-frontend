import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiEdit3, FiCpu, FiCheckCircle } from 'react-icons/fi';

const steps = [
  {
    icon: FiEdit3,
    title: "Write Your Prompt",
    description: "Describe what you need to test in plain English. Be as specific or general as you need."
  },
  {
    icon: FiCpu,
    title: "AI Generates Tests",
    description: "Our AI analyzes your requirements and creates comprehensive tests covering all critical paths."
  },
  {
    icon: FiCheckCircle,
    title: "Run & Integrate",
    description: "Download or copy the tests directly into your project. They're ready to run with no configuration."
  }
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section id="how-it-works" className="section bg-gray-50 dark:bg-dark-800 relative overflow-hidden">
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
            How It Works
          </motion.h2>
          <motion.p 
            className="text-dark-600 dark:text-dark-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Create comprehensive test suites in seconds with our simple three-step process
          </motion.p>
        </div>
        
        <div ref={ref} className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary-400 to-secondary-500 hidden md:block"></div>
          
          <div className="space-y-24 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="md:flex items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end md:pr-16' : 'md:order-2 md:justify-start md:pl-16'}`}>
                  <div className={`card max-w-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                        <step.icon className="w-6 h-6" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    
                    <p className="text-dark-600 dark:text-dark-300">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10 hidden md:block">
                  <motion.div 
                    className="h-12 w-12 bg-white dark:bg-dark-700 rounded-full border-4 border-primary-500 flex items-center justify-center font-bold text-primary-600 dark:text-primary-400"
                    animate={{ 
                      boxShadow: ['0 0 0 0px rgba(59, 130, 246, 0.2)', '0 0 0 10px rgba(59, 130, 246, 0)'],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {index + 1}
                  </motion.div>
                </div>
                
                <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:order-2 md:justify-start md:pl-16' : 'md:justify-end md:pr-16'}`}>
                  <div className="hidden md:block max-w-xs relative">
                    <motion.div 
                      className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-xl"
                      animate={{ 
                        opacity: [0.5, 0.8, 0.5], 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.5
                      }}
                    />
                    <div className="relative bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-100 dark:border-dark-700 shadow-lg">
                      {index === 0 && (
                        <div className="font-mono text-sm">
                          <div className="text-green-500 mb-2">// Test prompt:</div>
                          <div className="text-dark-800 dark:text-gray-300">Create unit tests for user authentication system with login, logout, and password reset</div>
                        </div>
                      )}
                      
                      {index === 1 && (
                        <div className="font-mono text-sm">
                          <div className="text-green-500 mb-2">// Generating tests...</div>
                          <div className="text-blue-500">✓ Analyzing requirements</div>
                          <div className="text-blue-500">✓ Creating test cases</div>
                          <div className="text-blue-500">✓ Generating assertions</div>
                          <div className="text-green-500 mt-2">// 15 tests generated!</div>
                        </div>
                      )}
                      
                      {index === 2 && (
                        <div className="font-mono text-sm">
                          <div className="text-green-500 mb-2">// Tests ready!</div>
                          <div className="flex justify-between text-dark-600 dark:text-dark-300">
                            <span>auth.test.js</span>
                            <span className="text-green-500">15 tests</span>
                          </div>
                          <div className="bg-dark-900 text-white mt-2 p-2 rounded text-xs">
                            npm test -- auth.test.js
                          </div>
                          <div className="text-green-500 mt-2">✓ All tests passed!</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;