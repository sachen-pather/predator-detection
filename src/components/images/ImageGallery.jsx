"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MONITORING_LOCATIONS } from "../../data/locations";
import { useDropbox } from "../../hooks/useDropbox";
import { useAuth } from "../../hooks/useAuth";
import { ACTIVITY_THRESHOLDS } from "../../utils/constants";
import ImageCard from "./ImageCard";
import ImageFilters from "./ImageFilters";

const ImageGallery = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getLocationImages, checkFolderExists } = useDropbox();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageCount, setImageCount] = useState(10);
  const [dateRange, setDateRange] = useState(7);

  // Find the location by ID
  const location = MONITORING_LOCATIONS.find(
    (loc) => loc.id === Number.parseInt(locationId)
  );

  const fetchImages = async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      // Check if folder exists first
      const folderExists = await checkFolderExists(location.dropboxPath);
      if (!folderExists) {
        throw new Error(
          `Monitoring location folder not found: ${location.dropboxPath}`
        );
      }

      const fetchedImages = await getLocationImages(
        location.dropboxPath,
        imageCount,
        dateRange
      );

      setImages(fetchedImages);
    } catch (err) {
      console.error("Error loading images:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchImages();
    } else {
      setError("Location not found");
      setLoading(false);
    }
  }, [location, imageCount, dateRange]);

  const getActivityLevel = () => {
    if (images.length >= ACTIVITY_THRESHOLDS.HIGH) return "high";
    if (images.length >= ACTIVITY_THRESHOLDS.MEDIUM) return "medium";
    return "low";
  };

  const getActivityBadgeClass = (level) => {
    switch (level) {
      case "high":
        return "bg-red-400/20 text-red-200 border-red-400/30";
      case "medium":
        return "bg-yellow-400/20 text-yellow-200 border-yellow-400/30";
      case "low":
        return "bg-green-400/20 text-green-200 border-green-400/30";
      default:
        return "bg-gray-400/20 text-gray-200 border-gray-400/30";
    }
  };

  if (!location) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center relative overflow-hidden">
        {/* Floating oceanic elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-5 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${20 + Math.random() * 15}s`,
              }}
            >
              {["🐧", "🌊", "🏔️", "❄️", "🦭", "🐟"][i]}
            </div>
          ))}
        </div>

        <div className="text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent mb-4">
              Location Not Found
            </h1>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all duration-300"
            >
              Return to Colony Base
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activityLevel = getActivityLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Floating oceanic elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${20 + Math.random() * 15}s`,
            }}
          >
            {["🐧", "🌊", "🏔️", "❄️", "🦭", "🐟", "🌨️", "🧊"][i]}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="mr-4 p-2 text-cyan-200/80 hover:text-cyan-100 hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent">
                🐧 {location.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-cyan-100/80">
                Welcome, {user?.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-cyan-200/60 hover:text-cyan-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Location Info */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent">
                {location.name}
              </h2>
              <p className="text-cyan-100/70 mt-1">{location.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <span
                  className={`px-4 py-2 rounded-xl text-sm font-medium border ${getActivityBadgeClass(
                    activityLevel
                  )}`}
                >
                  {activityLevel.toUpperCase()} ACTIVITY
                </span>
                <span className="text-sm text-cyan-200/60">
                  Path: {location.dropboxPath}
                </span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <ImageFilters
            imageCount={imageCount}
            setImageCount={setImageCount}
            dateRange={dateRange}
            setDateRange={setDateRange}
            onRefresh={fetchImages}
            loading={loading}
          />
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mb-4 animate-pulse">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-lg font-medium text-cyan-100 mb-2">
                Scanning the Colony...
              </h3>
              <p className="text-cyan-200/60 text-sm">
                Loading recent predator activity from monitoring cameras
              </p>
              <div className="mt-4">
                <div className="w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="p-6">
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 text-red-200">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Camera Connection Lost</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-16 m-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl mb-4">
                <svg
                  className="w-12 h-12 text-cyan-300/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-cyan-100 font-medium">
                Peaceful Colony
              </h3>
              <p className="text-cyan-200/60 mt-2">
                No predator activity detected in the selected time range
              </p>
              <p className="text-cyan-300/40 text-sm mt-1">
                Try expanding your search criteria or check back later
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-cyan-100/80">
                  <span className="text-lg font-medium text-cyan-100">
                    {images.length} Predator Detection
                    {images.length !== 1 ? "s" : ""}
                  </span>
                  <p className="text-sm text-cyan-200/60">
                    Captured in the last {dateRange} day
                    {dateRange !== 1 ? "s" : ""} • Sorted by most recent
                    activity
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-cyan-200/60">
                    Live Feed Active
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <ImageCard
                    key={image.id || index}
                    image={image}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageGallery;
