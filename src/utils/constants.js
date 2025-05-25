// Dropbox Configuration
export const DROPBOX_CONFIG = {
  accessToken:
    "sl.u.AFtlYr74jOOmd6wVgt86yqfnrf1UzxH6iAJJaCR6eFHUvxAJqnLQw3tcMpeo91NkUn_ivFOY1gQ9bkR1HG49_mMHhfgiQPHleDriTt9_03hx6CnDUYYwpcDX2hlmtQsYB6frvGsQZKlk8j1yBjNOkEKjqfReg3BKbdwqFUcnmZ8obsUru_rFDDAoA0Z70zuWdox0xKeuTqCcTBIXMB4rFcRYD8gGuRqcr7kTwHkmGYuMwNQYZFyRSJY5jfV2qsdvYtM0ZtY7_YuokjqLRfnQnA2C7PJ42sZnBg2VULzbxa1VR5iyZrCY2IQd__TrQH94ovNq8-omLrEwr5XTXapI97sbitMXXUzt4oc59A7DA9cecCJOxN1VTEFjylgPqvF_yWDIGgeem_2OHKd7yms4csekrxc1dsxLP8tvzog5GcXbW7bCyVxvy8qZbayH9dVkwjnbbBrMdtIP7q7yTXBLR3Xi4q7aR-EsuWkfyGUU71fjbM9wN8f8CntWBt81fK7R-4Aco149wSGqUZQPtYFBGGPzy5Dqc3r8LF7jwbU1IOCbJLZZErXZiNgJ6jbscVaO1Fh-mWSx0it1wTp3hHhE5ABsi-z2TnPNRnQ54-NfjuqhwbuQTJZvMiYmOLOwkhLV1CntEXdj1MyVPt12aUQxMPkBMtaDVRmEbP6JHsUTuogoAOepnycrT2y21ipHZ1Ig8wV3zySXykRxqJM3SQ-BLkk8gwgffM-yMhcQFto9h5zXAsS-PPHuaNTvQlc5_9p6r_PqRU6lJIGMH7cmlIVbtcIqN-jzYcYKJy7bsqUEpcQAudyUSRSbjzJUrPNHFvzk-9O8ZmtAuzPiIjkzLCT71eLF_-EcpxleHDXW_fJklFNWfd-E7hlY5il-OdKWADc432J_xgyWVbMkQuOM0FHDAjXFvJDs4HNWvUuoLF5fondRl98fHvFFriiCUKxsJ8vBuWvSapCl-6PhaXIpR0bo94jo8bMoLVvsgy_pprWxLgY0b4WzoxnHoIRazpt4BBUWXu6mfF1fgmmzwSB6_9hKS7F_P7BgW9KF-4d7OWYAb88sgox2w2gSmIa3h6Ec2uLXefOjYwHS3aywlfzCrtgIgC--wRRU7mHp0NX_k1vxIoK5L4xSXl8yhmts7Znk51qKYU65ITxAH1fhLSzkDmf2CwoiJ1n_VtWa7U6N9k5MO9uwxfFc2CePAIhSbXbNHF_RZylytS2752-T87W_k2NxVJbr3uGruM0nl8CStkWQ1Ohq4cGMUJXdOSxL21n31xsiYcdPdcB8dgnBEJZcz3o1hffv1ClepGEAC4POxRoUw5c_jMEz9WUpGjxc0nrQKE_wRkVD39VQAMnONDvHczayeraJM0BjZ8KAdEf9-Hah_xcW1agskzaC4Xz-ssO-Z0tJ5sBVhlbFFU4V_1uymvKEK4uY", // Add your Dropbox access token here
};

// Activity frequency thresholds
export const ACTIVITY_THRESHOLDS = {
  HIGH: 10,
  MEDIUM: 5,
};

// Date range options for filtering
export const DATE_RANGES = [
  { value: 1, label: "Last 24 hours" },
  { value: 7, label: "Last 7 days" },
  { value: 30, label: "Last 30 days" },
  { value: 90, label: "Last 90 days" },
];

// Image count options
export const IMAGE_COUNT_OPTIONS = [
  { value: 5, label: "5 images" },
  { value: 10, label: "10 images" },
  { value: 20, label: "20 images" },
  { value: 50, label: "50 images" },
];

// Map configuration
export const MAP_CONFIG = {
  center: [-33.9249, 18.4241], // Cape Town area
  zoom: 12,
};
