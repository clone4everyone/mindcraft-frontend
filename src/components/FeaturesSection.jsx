import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiCpu,
  FiClock, 
  FiCode, 
  FiShield, 
  FiGlobe, 
  FiZap 
} from 'react-icons/fi';

const features = [
  {
    icon: FiCpu, // Changed from FiBrain to FiCpu as it's a better available alternative
    title: "AI-Powered Test Generation",
    description: "Our advanced AI understands testing requirements and creates comprehensive test suites from simple prompts."
  },
  {
    icon: FiClock,
    title: "Save Development Time",
    description: "Reduce test writing time by up to 80%. Focus on building features, not writing tests."
  },
  {
    icon: FiCode,
    title: "Multiple Framework Support",
    description: "Generate tests for any popular testing framework including Jest, Mocha, Vitest, Cypress, and more."
  },
  {
    icon: FiShield,
    title: "Improved Test Coverage",
    description: "AI identifies edge cases and potential bugs that humans might miss, ensuring better test coverage."
  },
  {
    icon: FiGlobe,
    title: "Language Agnostic",
    description: "Create tests for JavaScript, TypeScript, Python, Java, Go, and other popular programming languages."
  },
  {
    icon: FiZap,
    title: "Instant Integration",
    description: "Generated tests work with your existing codebase and CI/CD pipelines with zero configuration."
  }
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features" className="section relative overflow-hidden">
      <div className="mesh-overlay"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 h-64 w-64 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-10 h-40 w-40 bg-secondary-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Supercharge Your Testing Workflow
          </motion.h2>
          <motion.p 
            className="text-dark-600 dark:text-dark-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Transform test creation from a time-consuming chore into a seamless experience
            with our advanced prompt-based test generation platform.
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="card group hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-xl"></div>
              
              <div className="relative">
                <div className="mb-4 inline-block p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                  <feature.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-dark-600 dark:text-dark-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;