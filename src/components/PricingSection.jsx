import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

const PricingSection = () => {
  const [annual, setAnnual] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out the platform",
      price: {
        monthly: 0,
        annually: 0
      },
      features: [
        "50 test generations per month",
        "Basic test templates",
        "Single programming language",
        "Community support",
        "7-day history"
      ],
      notIncluded: [
        "Advanced test scenarios",
        "Multiple frameworks",
        "API access",
        "Priority support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      description: "For professional developers and small teams",
      price: {
        monthly: 29,
        annually: 19
      },
      features: [
        "500 test generations per month",
        "Advanced test templates",
        "Multiple programming languages",
        "Multiple testing frameworks",
        "API access",
        "30-day history",
        "Email support"
      ],
      notIncluded: [
        "Custom templates",
        "Priority support"
      ],
      cta: "Start 14-Day Trial",
      popular: true
    },
    {
      name: "Team",
      description: "For development teams that need the best",
      price: {
        monthly: 79,
        annually: 59
      },
      features: [
        "Unlimited test generations",
        "Advanced & custom test templates",
        "All programming languages",
        "All testing frameworks",
        "Advanced API access",
        "90-day history",
        "Priority support",
        "Team management",
        "Usage analytics"
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="section relative overflow-hidden">
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
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="text-dark-600 dark:text-dark-300 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Choose the plan that's right for you and start generating tests today
          </motion.p>
          
          <motion.div 
            className="inline-flex p-1 bg-gray-100 dark:bg-dark-700 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!annual ? 'bg-white dark:bg-dark-800 shadow-sm' : ''}`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${annual ? 'bg-white dark:bg-dark-800 shadow-sm' : ''}`}
              onClick={() => setAnnual(true)}
            >
              Annually
              <span className="ml-1 text-xs text-primary-500">Save 34%</span>
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`card border ${plan.popular ? 'border-primary-500 dark:border-primary-500' : 'border-gray-200 dark:border-dark-700'} relative`}
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
              }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-4 mr-4">
                  <div className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-dark-500 dark:text-dark-400 text-sm">{plan.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-4xl font-bold">${annual ? plan.price.annually : plan.price.monthly}</span>
                  <span className="text-dark-500 dark:text-dark-400 ml-1">/month</span>
                </div>
                {annual && plan.price.monthly > 0 && (
                  <div className="mt-1 text-xs text-primary-500">
                    ${plan.price.monthly * 12 - plan.price.annually * 12} saved annually
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-dark-600 dark:text-dark-300 text-sm">{feature}</span>
                    </li>
                  ))}
                  
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-start text-dark-400 dark:text-dark-500">
                      <FiX className="h-5 w-5 text-dark-400 dark:text-dark-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <motion.a 
                href="#"
                className={`btn block text-center ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 card text-center border border-gray-200 dark:border-dark-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-dark-600 dark:text-dark-300 mb-6">
              Need a custom solution? We offer tailored plans for large teams and organizations.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-8">
              <li className="flex items-center">
                <FiCheck className="h-5 w-5 text-green-500 mr-2" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="h-5 w-5 text-green-500 mr-2" />
                <span>Dedicated support</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="h-5 w-5 text-green-500 mr-2" />
                <span>On-premise options</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="h-5 w-5 text-green-500 mr-2" />
                <span>SLA guarantees</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="h-5 w-5 text-green-500 mr-2" />
                <span>Custom training</span>
              </li>
              <li className="flex items-center">
                <FiCheck className="h-5 w-5 text-green-500 mr-2" />
                <span>Security compliance</span>
              </li>
            </ul>
            <motion.a 
              href="#"
              className="btn btn-outline inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Sales Team
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;