import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
