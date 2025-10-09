import React from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiSearch, FiCheckCircle } from 'react-icons/fi';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: FiUpload,
      title: "Upload Image",
      description: "Take a photo or upload an image of your medicine package",
      color: "from-blue-500 to-blue-600"
    },
    {
      number: 2,
      icon: FiSearch,
      title: "AI Analysis",
      description: "Our AI extracts text and compares it with verified medicine database",
      color: "from-green-500 to-green-600"
    },
    {
      number: 3,
      icon: FiCheckCircle,
      title: "Get Results",
      description: "Receive instant verification with confidence score and detailed information",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Simple three-step process to verify your medicine
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              className="text-center relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                />
              )}
              
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold relative z-10 shadow-lg`}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {step.number}
                </motion.div>
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
        
        {/* Additional info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-800 rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiCheckCircle className="text-lg" />
            <span className="font-medium">Process typically takes 2-5 seconds</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
