import React from "react";
import { motion } from "framer-motion";

const Wrapper = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Wrapper;
