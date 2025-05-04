import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { useClerk , useUser} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer at TechFlow",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "TestPrompt has completely transformed our testing process. What used to take days now takes minutes. The AI generates tests that are more comprehensive than what our team was writing manually."
  },
  {
    name: "Michael Rodriguez",
    role: "Lead Engineer at DataSphere",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "I was skeptical about AI-generated tests, but TestPrompt exceeded all my expectations. The code quality is excellent, and it's saved us countless hours. It even catches edge cases we would have missed."
  },
  {
    name: "Priya Sharma",
    role: "CTO at StartupScale",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "As a startup, we need to move fast but can't sacrifice quality. TestPrompt gives us the best of both worlds. We've increased our test coverage by 200% while reducing the time spent writing tests by 80%."
  }
];

const TestimonialsSection = () => {
  const navigate=useNavigate();
  const {redirectToSignIn}=useClerk();
  const {isSignedIn}=useUser();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const handleGetStarted = () => {
    if(isSignedIn) {
    navigate("/user/new")
    }else{
        redirectToSignIn();
    }
  
  };
  return (
    <section id="testimonials" className="section bg-gray-50 dark:bg-dark-800 relative overflow-hidden">
    
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Loved by Developers
          </motion.h2>
          <motion.p 
            className="text-dark-600 dark:text-dark-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            See what engineering teams are saying about our platform
          </motion.p>
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
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="card relative"
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
              }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 left-0 -mt-4 -ml-4">
                <div className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Verified User
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-dark-600 dark:text-dark-300 mb-6">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-white dark:border-dark-700 shadow-sm"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-dark-500 dark:text-dark-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 p-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto" >
            <h3 className="text-2xl font-bold mb-4">Ready to transform your testing workflow?</h3>
            <p className="text-dark-600 dark:text-dark-300 mb-6">
              Join thousands of developers saving hours every week with our AI-powered test generation.
            </p>
            <motion.p 
              onClick={handleGetStarted}
              className="btn btn-primary inline-block hover:cursor-pointer "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;