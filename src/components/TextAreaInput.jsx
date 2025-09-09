import { motion } from 'framer-motion';

const TextAreaInput = ({ title, subtitle, value, onChange, placeholder, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <h4 className="text-lg font-medium text-gray-300 mb-2">{subtitle}</h4>
        <p className="text-sm text-gray-400">Paste the {title.toLowerCase()} you're applying for</p>
      </div>

      <div className="relative">
        <div className="absolute top-4 left-4">
          {icon}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `Paste the ${title.toLowerCase()} here...`}
          className="w-full h-64 p-4 pl-16 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
      </div>
    </motion.div>
  );
};

export default TextAreaInput;
