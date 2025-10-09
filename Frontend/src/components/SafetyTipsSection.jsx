import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiInfo, FiAlertTriangle } from 'react-icons/fi';

const SafetyTipsSection = () => {
  const tips = [
    {
      number: 1,
      title: "Barcode Verification",
      description: "Currently, barcodes are available on about 25% of medicines. Scan the barcode to be directed to the original manufacturer's website for verification.",
      color: "blue",
      icon: "🔍"
    },
    {
      number: 2,
      title: "Packaging Inspection",
      description: "Check for unusual fonts, colors, or spelling errors. Ensure no seal breakage and that holograms are intact and not missing.",
      color: "green",
      icon: "📦"
    },
    {
      number: 3,
      title: "Physical Appearance",
      description: "Examine the shape and appearance. Watch for smaller tablets, excessive powder at the bottom, or visible cracks in tablets.",
      color: "purple",
      icon: "🔬"
    },
    {
      number: 4,
      title: "Batch & Expiry Check",
      description: "Verify that batch number and expiry date on the strip or bottle match the outer packaging. Mismatches indicate tampering.",
      color: "orange",
      icon: "📅"
    },
    {
      number: 5,
      title: "Price Verification",
      description: "Compare the cost with usual market price. Unusually low or heavily discounted prices may indicate counterfeit medicine.",
      color: "red",
      icon: "💰"
    },
    {
      number: 6,
      title: "Stay Safe",
      description: "Always purchase medicines from licensed pharmacies and authorized dealers. When in doubt, consult your healthcare provider.",
      color: "indigo",
      icon: "🛡️"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200",
      green: "bg-green-50 border-green-200",
      purple: "bg-purple-50 border-purple-200",
      orange: "bg-orange-50 border-orange-200",
      red: "bg-red-50 border-red-200",
      indigo: "bg-indigo-50 border-indigo-200"
    };
    return colorMap[color] || colorMap.blue;
  };

  const getNumberColor = (color) => {
    const colorMap = {
      blue: "bg-blue-600",
      green: "bg-green-600",
      purple: "bg-purple-600",
      orange: "bg-orange-600",
      red: "bg-red-600",
      indigo: "bg-indigo-600"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="safety-tips" className="py-20 bg-white">
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
            Medicine Verification Guidelines
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Important safety tips to help you identify authentic medicines and avoid counterfeits
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div 
              key={tip.number}
              className={`border rounded-xl p-6 ${getColorClasses(tip.color)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className={`w-12 h-12 ${getNumberColor(tip.color)} rounded-full flex items-center justify-center mb-4`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-lg">{tip.number}</span>
              </motion.div>
              
              <motion.h3 
                className="text-lg font-semibold text-gray-900 mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                viewport={{ once: true }}
              >
                {tip.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                {tip.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
        
        {/* Important note */}
        <motion.div 
          className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          <motion.div 
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <FiInfo className="text-yellow-600 text-2xl mt-1 flex-shrink-0" />
            </motion.div>
            <div>
              <motion.h3 
                className="text-lg font-semibold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Important Note
              </motion.h3>
              <motion.p 
                className="text-gray-700"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
              >
                These guidelines complement our AI-powered verification system. Always use multiple verification methods for the highest level of safety when dealing with medicines.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SafetyTipsSection;
