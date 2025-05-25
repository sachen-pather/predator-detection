// Working Optimized ImageCard (Clean version of what actually works)
"use client";

import { useState, memo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const ImageCard = memo(({ image, index }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Pre-warm the connection by testing fetch (like your working version)
  useEffect(() => {
    const preWarmConnection = async () => {
      try {
        // This seems to help with loading - keeping it from your working version
        await fetch(image.url, { method: "HEAD" });
      } catch (error) {
        // Ignore errors here, just trying to pre-warm
      }
    };

    if (image.url) {
      preWarmConnection();
    }
  }, [image.url]);

  const handleImageError = useCallback(
    (e) => {
      console.error(`❌ IMG ERROR for ${image.name}:`, {
        url: image.url,
        error: e,
        errorType: e.type,
      });
      setImageError(true);
      setImageLoading(false);
    },
    [image.name, image.url]
  );

  const handleImageLoad = useCallback(
    (e) => {
      console.log(`✅ IMG LOADED for ${image.name}:`, {
        naturalWidth: e.target.naturalWidth,
        naturalHeight: e.target.naturalHeight,
      });
      setImageLoading(false);
    },
    [image.name]
  );

  // 10-second timeout like your working version
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (imageLoading && !imageError) {
        console.warn(`⏰ TIMEOUT: Image ${image.name} took too long to load`);
        setImageError(true);
        setImageLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [imageLoading, imageError, image.name]);

  const formattedDate = useCallback(() => {
    return new Date(image.modified).toLocaleDateString();
  }, [image.modified]);

  const formattedFileSize = useCallback(() => {
    const bytes = image.size;
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  }, [image.size]);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const hoverVariants = {
    initial: { opacity: 0, height: 0 },
    whileHover: { opacity: 1, height: "auto" },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50/80 to-cyan-100/80 backdrop-blur-sm border border-cyan-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Floating oceanic element */}
      <div className="absolute top-2 left-2 text-cyan-600/30 text-lg animate-pulse">
        🐧
      </div>

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

      <div className="relative">
        {imageLoading && !imageError && (
          <div className="w-full h-48 bg-gradient-to-br from-slate-200/50 to-cyan-300/50 animate-pulse flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="w-8 h-8 border-3 border-cyan-600/30 border-t-cyan-600 rounded-full"
            />
            <div className="mt-2 text-cyan-600 text-sm">Loading...</div>
          </div>
        )}

        {!imageError ? (
          <div className="relative overflow-hidden">
            <img
              src={image.url}
              alt={image.name}
              className={`w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoading ? "hidden" : "block"
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="eager" // Keep eager loading like your working version
              decoding="async"
              crossOrigin="anonymous" // Keep this since it works in your version
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-red-100/50 to-orange-200/50 flex flex-col items-center justify-center p-4">
            <div className="text-red-400 text-2xl mb-2">⚠️</div>
            <span className="text-red-600 text-sm text-center font-medium">
              Failed to load
            </span>
            <span className="text-xs text-red-500 text-center mt-1">
              {image.name}
            </span>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => window.open(image.url, "_blank")}
                className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              >
                Open Direct URL
              </button>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = image.url;
                  link.download = image.name;
                  link.target = "_blank";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              >
                Download Image
              </button>
            </div>
          </div>
        )}

        {!imageError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-cyan-100 text-xs px-3 py-1.5 rounded-full border border-cyan-400/30"
          >
            {formattedDate()}
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-gradient-to-br from-slate-50/90 to-cyan-100/90 backdrop-blur-sm">
        <motion.p
          className="text-sm font-semibold text-slate-900 truncate mb-2 group-hover:text-slate-800 transition-colors"
          title={image.name}
        >
          {image.name}
        </motion.p>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-700/80 font-medium">
            {formattedFileSize()}
          </p>

          {/* Activity indicator */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-700 font-medium">Active</span>
          </div>
        </div>

        {/* Hover reveal: additional metadata */}
        <motion.div
          variants={hoverVariants}
          initial="initial"
          whileHover="whileHover"
          className="mt-2 pt-2 border-t border-cyan-200/50 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-cyan-600 break-all flex-1">
              📍 {image.url.substring(0, 30)}...
            </p>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = image.url;
                link.download = image.name;
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="ml-2 px-2 py-1 bg-cyan-500 text-white rounded text-xs hover:bg-cyan-600 transition-colors flex items-center gap-1"
              title="Download Image"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>
          </div>
        </motion.div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
});

ImageCard.displayName = "ImageCard";

export default ImageCard;
