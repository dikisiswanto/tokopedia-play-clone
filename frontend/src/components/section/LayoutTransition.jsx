import { motion } from 'framer-motion';

export const PageTransition = ({ children }) => {
  const variants = {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1, opacity: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
};

export const ItemTransition = ({ children }) => {
  const variants = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      y: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      // transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export const ContainerTransition = ({ children }) => {
  const variants = {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 2.8 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
