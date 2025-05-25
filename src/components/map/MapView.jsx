"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useAuth } from "../../hooks/useAuth";
import { useDropbox } from "../../hooks/useDropbox";
import { MONITORING_LOCATIONS } from "../../data/locations";
import { MAP_CONFIG, ACTIVITY_THRESHOLDS } from "../../utils/constants";
import { formatDate } from "../../utils/dateUtils";
import LocationPin from "./LocationPin";
import LoadingSpinner from "../ui/LoadingSpinner";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const { user, logout } = useAuth();
  const { locationStats, loading, loadLocationStats } = useDropbox();

  useEffect(() => {
    loadLocationStats(MONITORING_LOCATIONS);
  }, []);

  const getActivityCounts = () => {
    const counts = { high: 0, medium: 0, low: 0 };
    Object.values(locationStats).forEach((stats) => {
      if (!stats) return;
      if (stats.recentImages >= ACTIVITY_THRESHOLDS.HIGH) counts.high++;
      else if (stats.recentImages >= ACTIVITY_THRESHOLDS.MEDIUM)
        counts.medium++;
      else counts.low++;
    });
    return counts;
  };

  const activityCounts = getActivityCounts();

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
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent">
                🐧 Penguin Colony Protection System
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-cyan-100/80">
                <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/50 animate-pulse"></div>
                <span>High (10+ recent)</span>
                <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse"></div>
                <span>Medium (5-9)</span>
                <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-pulse"></div>
                <span>Low (&lt;5)</span>
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
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Coastal Monitoring Stations
            </h2>
            <p className="mt-2 text-cyan-100/70">
              Real-time monitoring of predator activity near penguin colonies.
              Click any location marker to view recent camera captures and
              predator alerts.
            </p>
          </div>

          {/* Map Container */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden mb-6">
            <div style={{ height: "600px", width: "100%" }}>
              <MapContainer
                center={MAP_CONFIG.center}
                zoom={MAP_CONFIG.zoom}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {MONITORING_LOCATIONS.map((location) => (
                  <LocationPin
                    key={location.id}
                    location={location}
                    stats={locationStats[location.id]}
                  />
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300">
                      <span className="text-xl">📍</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-cyan-200/80 truncate">
                        Active Stations
                      </dt>
                      <dd className="text-2xl font-bold text-cyan-100">
                        {MONITORING_LOCATIONS.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-400/50 transition-all duration-300">
                      <div className="w-6 h-6 bg-red-100 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-cyan-200/80 truncate">
                        High Alert
                      </dt>
                      <dd className="text-2xl font-bold text-cyan-100">
                        {activityCounts.high}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-400/50 transition-all duration-300">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-cyan-200/80 truncate">
                        Medium Alert
                      </dt>
                      <dd className="text-2xl font-bold text-cyan-100">
                        {activityCounts.medium}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-400/50 transition-all duration-300">
                      <div className="w-6 h-6 bg-green-100 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-cyan-200/80 truncate">
                        Secure Zones
                      </dt>
                      <dd className="text-2xl font-bold text-cyan-100">
                        {activityCounts.low}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-medium bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Colony Protection Status
              </h3>
            </div>
            {loading ? (
              <div className="p-6">
                <LoadingSpinner text="Loading colony protection data..." />
              </div>
            ) : (
              <ul className="divide-y divide-white/10">
                {MONITORING_LOCATIONS.map((location) => {
                  const stats = locationStats[location.id];
                  const frequency = stats
                    ? stats.recentImages >= ACTIVITY_THRESHOLDS.HIGH
                      ? "high"
                      : stats.recentImages >= ACTIVITY_THRESHOLDS.MEDIUM
                      ? "medium"
                      : "low"
                    : "unknown";

                  return (
                    <li
                      key={location.id}
                      className="px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full mr-4 shadow-lg animate-pulse ${
                              frequency === "high"
                                ? "bg-red-400 shadow-red-400/50"
                                : frequency === "medium"
                                ? "bg-yellow-400 shadow-yellow-400/50"
                                : frequency === "low"
                                ? "bg-green-400 shadow-green-400/50"
                                : "bg-gray-400"
                            }`}
                          ></div>
                          <div>
                            <p className="text-sm font-medium text-cyan-100">
                              {location.name}
                            </p>
                            <p className="text-sm text-cyan-200/60">
                              {location.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {stats ? (
                            <>
                              <p className="text-sm font-medium text-cyan-100">
                                {stats.recentImages} recent detections
                              </p>
                              {stats.lastActivity && (
                                <p className="text-sm text-cyan-200/60">
                                  Last: {formatDate(stats.lastActivity)}
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-sm text-cyan-200/60">
                              Loading...
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-slate-900/30 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-cyan-200">
                  How to Navigate Colony Protection
                </h3>
                <div className="mt-2 text-sm text-cyan-100/70">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Click on any monitoring station marker to view recent
                      predator detections
                    </li>
                    <li>
                      Red markers indicate high-risk areas with frequent
                      predator activity
                    </li>
                    <li>
                      Yellow markers show moderate risk zones requiring
                      attention
                    </li>
                    <li>
                      Green markers represent secure areas with minimal predator
                      threats
                    </li>
                    <li>
                      All images are captured by automated camera traps
                      monitoring for leopards, caracals, and other threats
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapView;
