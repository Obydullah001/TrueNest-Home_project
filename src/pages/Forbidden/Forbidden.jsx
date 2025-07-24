import React from "react";
import { motion } from "framer-motion";

const bgVariants = {
  animate: {
    backgroundPosition: [
      "0% 50%",
      "100% 50%",
      "0% 50%",
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const iconVariants = {
  animate: {
    x: [0, 20, 0, -20, 0], // Move right, center, left, center
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Forbidden = () => {
  return (
    <motion.div
      variants={bgVariants}
      animate="animate"
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #f7e9e9 0%, #f5f5f5 50%, #e6f0ea 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.85)",
          border: "1.5px solid #dfadb2",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 32px 0 rgba(162, 62, 72, 0.10)",
          padding: "2.5rem 2rem",
          minWidth: "340px",
          maxWidth: "90vw",
          textAlign: "center",
        }}
      >
        {/* Animated SVG Illustration */}
        <motion.div
          variants={iconVariants}
          animate="animate"
          style={{ marginBottom: "1.2rem", display: "inline-block" }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" fill="#dfadb2" stroke="#A23E48" strokeWidth="4"/>
            <rect x="30" y="47" width="40" height="6" rx="3" fill="#A23E48"/>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#a82b4e" strokeWidth="4" strokeDasharray="8 8"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="#A23E48" strokeWidth="2" strokeDasharray="4 4"/>
          </svg>
        </motion.div>
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "#A23E48",
            margin: 0,
            letterSpacing: "1px",
            textShadow: "0 2px 8px #fff8",
          }}
        >
          403 Forbidden
        </h1>
        <p
          style={{
            color: "#a82b4e",
            marginTop: "1rem",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            fontWeight: 500,
            textShadow: "0 1px 4px #fff6",
          }}
        >
          Sorry, you don&apos;t have permission to access this page.<br />
          If you think this is a mistake, please contact the administrator.
        </p>
        <motion.a
          href="/"
          whileHover={{
            scale: 1.07,
            backgroundColor: "#A23E48",
            color: "#fff",
          }}
          style={{
            display: "inline-block",
            marginTop: "2rem",
            padding: "0.8rem 2.2rem",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#A23E48",
            background: "rgba(223,173,178,0.15)",
            border: "none",
            borderRadius: "2rem",
            boxShadow: "0 2px 8px #dfadb233",
            cursor: "pointer",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          Go Home
        </motion.a>
        <div
          style={{
            marginTop: "2.5rem",
            background: "#a82b4e",
            color: "#fff",
            borderRadius: "1rem",
            padding: "0.7rem 0",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: "0 2px 8px #a23e4833",
          }}
        >
          TrueNest &mdash; Access Restricted
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Forbidden;