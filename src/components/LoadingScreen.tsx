import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src="/logo.png"
        alt="StudyFlow"
        className="loading-logo"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.8,
          ease: "easeOut",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        StudyFlow
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.45 }}
      >
        Preparing your workspace...
      </motion.p>

      <div className="loading-bar">
        <motion.div
          className="loading-progress"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.0 }}
        />
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
