// Location data with real coordinates - update these with your actual camera locations
export const MONITORING_LOCATIONS = [
  {
    id: 1,
    name: "Honey Badger Trail",
    coordinates: [-33.9249, 18.4241], // Cape Town area - replace with actual coordinates
    dropboxPath: "/honey-badger",
    frequency: "high", // This will be calculated based on actual sighting data
    description: "Primary monitoring location for honey badger activity",
  },
  {
    id: 2,
    name: "River Crossing Point",
    coordinates: [-33.935, 18.415], // Replace with actual coordinates
    dropboxPath: "/location-2", // Replace with actual Dropbox folder
    frequency: "medium",
    description: "Secondary monitoring point near water source",
  },
  {
    id: 3,
    name: "Valley Perimeter",
    coordinates: [-33.915, 18.435], // Replace with actual coordinates
    dropboxPath: "/location-3", // Replace with actual Dropbox folder
    frequency: "low",
    description: "Outer perimeter monitoring station",
  },
];
