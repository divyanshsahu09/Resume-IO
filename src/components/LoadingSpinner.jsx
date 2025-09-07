import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = "Analyzing your resume..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 w-8 h-8 border-2 border-blue-400 border-b-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p
        className="text-white mt-4 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>
      <motion.div
        className="flex space-x-1 mt-2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0.5
            }
          }
        }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-primary-400 rounded-full"
            variants={{
              hidden: { opacity: 0.3, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;