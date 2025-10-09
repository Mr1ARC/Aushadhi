import React from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiShield, FiZap, FiSearch, FiActivity, FiCheckCircle } from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      icon: FiEye,
      title: "OCR Recognition",
      description: "Advanced optical character recognition extracts text from medicine packaging with high accuracy",
      color: "blue",
      delay: 0.1
    },
    {
      icon: FiShield,
      title: "Counterfeit Detection",
      description: "Identifies potential counterfeit medicines by comparing against verified pharmaceutical database",
      color: "green",
      delay: 0.2
    },
    {
      icon: FiZap,
      title: "Real-time Analysis",
      description: "Instant verification results with confidence scoring for quick decision making",
      color: "purple",
      delay: 0.3
    },
    {
      icon: FiSearch,
      title: "Smart Matching",
      description: "Intelligent fuzzy matching algorithm finds the best possible medicine matches",
      color: "indigo",
      delay: 0.4
    },
    {
      icon: FiActivity,
      title: "Quality Validation",
      description: "Validates image quality and pharmaceutical keywords for accurate results",
      color: "orange",
      delay: 0.5
    },
    {
      icon: FiCheckCircle,
      title: "Trusted Database",
      description: "Comprehensive database of verified medicines with detailed composition information",
      color: "emerald",
      delay: 0.6
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-600",
      green: "bg-green-50 border-green-200 text-green-600",
      purple: "bg-purple-50 border-purple-200 text-purple-600",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-600",
      orange: "bg-orange-50 border-orange-200 text-orange-600",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-600"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="features" className="py-20 bg-white">
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
            Powerful Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Advanced OCR technology combined with comprehensive medicine database for accurate verification
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className={`text-center p-6 rounded-xl border ${getColorClasses(feature.color)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(feature.color)}`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="text-2xl" />
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: feature.delay + 0.1 }}
                viewport={{ once: true }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: feature.delay + 0.2 }}
                viewport={{ once: true }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
