import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { ACTIVITY_THRESHOLDS } from "../../utils/constants";
import { formatDate } from "../../utils/dateUtils";

// Create custom markers for different frequency levels
const createCustomIcon = (frequency) => {
  const color =
    frequency === "high"
      ? "#ef4444"
      : frequency === "medium"
      ? "#f59e0b"
      : "#10b981";

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        font-weight: bold;
      ">
        📷
      </div>
    `,
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

const LocationPin = ({ location, stats }) => {
  const navigate = useNavigate();

  const getLocationFrequency = () => {
    if (!stats) return "unknown";
    const { recentImages } = stats;
    if (recentImages >= ACTIVITY_THRESHOLDS.HIGH) return "high";
    if (recentImages >= ACTIVITY_THRESHOLDS.MEDIUM) return "medium";
    return "low";
  };

  const frequency = getLocationFrequency();

  const handleMarkerClick = () => {
    navigate(`/location/${location.id}`);
  };

  return (
    <Marker
      position={location.coordinates}
      icon={createCustomIcon(frequency)}
      eventHandlers={{
        click: handleMarkerClick,
      }}
    >
      <Popup>
        <div className="text-center min-w-48">
          <h3 className="font-semibold text-lg">{location.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{location.description}</p>
          <div className="space-y-1">
            <p className="text-sm">
              Activity:{" "}
              <span
                className={`font-medium ${
                  frequency === "high"
                    ? "text-red-600"
                    : frequency === "medium"
                    ? "text-yellow-600"
                    : frequency === "low"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {frequency.toUpperCase()}
              </span>
            </p>
            {stats && (
              <>
                <p className="text-xs text-gray-500">
                  Recent images: {stats.recentImages}
                </p>
                {stats.lastActivity && (
                  <p className="text-xs text-gray-500">
                    Last: {formatDate(stats.lastActivity)}
                  </p>
                )}
              </>
            )}
          </div>
          <button
            onClick={handleMarkerClick}
            className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
          >
            View Images
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default LocationPin;
