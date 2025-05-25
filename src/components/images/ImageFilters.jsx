"use client";
import { DATE_RANGES, IMAGE_COUNT_OPTIONS } from "../../utils/constants";

const ImageFilters = ({
  imageCount,
  setImageCount,
  dateRange,
  setDateRange,
  onRefresh,
  loading,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label className="block text-sm font-medium text-cyan-200/80 mb-2">
          Number of Images
        </label>
        <select
          value={imageCount}
          onChange={(e) => setImageCount(Number(e.target.value))}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-cyan-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
          disabled={loading}
        >
          {IMAGE_COUNT_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-slate-900 text-cyan-100"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-cyan-200/80 mb-2">
          Date Range
        </label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(Number(e.target.value))}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-cyan-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
          disabled={loading}
        >
          {DATE_RANGES.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-slate-900 text-cyan-100"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onRefresh}
        disabled={loading}
        className="self-end px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all duration-300 group"
      >
        {loading ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            Scanning...
          </div>
        ) : (
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh Feed
          </div>
        )}
      </button>
    </div>
  );
};

export default ImageFilters;
