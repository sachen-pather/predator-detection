"use client";

import { motion, AnimatePresence } from "framer-motion";

const AlertBadge = ({ type = "error", message, onClose }) => {
  const configs = {
    error: {
      bg: "from-red-500/20 to-pink-500/20",
      border: "border-red-400/30",
      text: "text-red-100",
      icon: "⚠️",
      glow: "shadow-red-500/25",
    },
    warning: {
      bg: "from-yellow-500/20 to-orange-500/20",
      border: "border-yellow-400/30",
      text: "text-yellow-100",
      icon: "⚡",
      glow: "shadow-yellow-500/25",
    },
    success: {
      bg: "from-green-500/20 to-emerald-500/20",
      border: "border-green-400/30",
      text: "text-green-100",
      icon: "✅",
      glow: "shadow-green-500/25",
    },
    info: {
      bg: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-400/30",
      text: "text-blue-100",
      icon: "ℹ️",
      glow: "shadow-blue-500/25",
    },
  };

  const config = configs[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className={`bg-gradient-to-r ${config.bg} backdrop-blur-xl border ${config.border} rounded-2xl p-4 shadow-2xl ${config.glow} relative overflow-hidden`}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ x: [-100, 300] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative flex items-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-2xl mr-3"
          >
            {config.icon}
          </motion.div>

          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`font-medium ${config.text}`}
            >
              {message}
            </motion.p>
          </div>

          {onClose && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`ml-4 ${config.text} hover:opacity-80 transition-opacity`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlertBadge;
