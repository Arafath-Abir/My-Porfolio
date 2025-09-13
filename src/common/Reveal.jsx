// src/components/common/Reveal.jsx
import { motion } from "framer-motion";

const Reveal = ({ children, delay = 0, y = 16 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 220, damping: 26, delay }}
    viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
    style={{ willChange: "transform,opacity" }}
  >
    {children}
  </motion.div>
);

export default Reveal;
