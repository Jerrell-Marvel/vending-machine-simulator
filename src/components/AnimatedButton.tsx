import { AnimatePresence, motion } from "framer-motion";

const animatedButtonVariants = {
  hidden: {
    y: 25,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },

  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

type AnimatedButtonProps = {
  text: string;
  onClick: () => void;
};

const AnimatedButton = ({ text, onClick }: AnimatedButtonProps) => {
  return (
    <AnimatePresence>
      <motion.button
        className="animated-btn"
        onClick={() => {
          onClick();
        }}
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={animatedButtonVariants}
      >
        {text}
      </motion.button>
    </AnimatePresence>
  );
};

export default AnimatedButton;
