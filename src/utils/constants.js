// Dropbox Configuration
export const DROPBOX_CONFIG = {
  accessToken:
    "sl.u.AFvHgBCTMorMvIhCgfYnZZt47aLcNGR-3fNJCCfJl0elyzGAwnwve_enj3uxaCWu701PtHHMU3xFVeD0W5G-m8Ck-IBCZOlxBUVyd4PYkg9E7B5SRu-EqdKEsTeJU3rhXZ7KcRCEMEr4OLYXasij5k0OlrAE4kj9lt5_JoO64oCisZ1qdeVuB-m610j11216i2WE1c0tsxtrxM55g3pipGCYBwVdGVsVJaUWU9xZVs-myQFrZIuqwTmAQLUeUYAvIJFBJokTnDuftrPK-tD9qw1IDDahBSTk8Fas8hwlFRtY3KLaAhALSg6o_WN99iFIkyYnFph5lX1EBVn5GVPV6nEkTKxAMOtDC7VNul592Y-faYyiRZDfeKlZszPUir6ADGgKv2NMYkAkKamMnKtfpdIc7YILgCjAj1gXNCDLI-7-GJtsmMGAUUobFvrTmbi4flMJiocTMfWqYM6UZXMPdldaB-MgwD5rsEhkG80cvdaqHj_JgV5JJBmmQMy_dGj1Pw5hQITAlkurmL6BUnJD5qpFRDEMmHiHvi-woWfp07lRSW2q5WU4YKuTE2qfWs_5_XP3lGs0fSLX56V26QDKhr73ZrxnD3Y3vhBeqdMeqS9qEt_Ybdcnm3dkFeLuztJX-oTCaqv8fOesG91FX-cS1qGoCEn4QkTZBcYINpf9ibXBHjgRq5VPzJdJC05m5DzN-UuSvXPte8fMwYQyoNOCbuRPYSfHZv7gOroI0jHkmPLniBzaplpjW71hQW2NI0u7qV4AxSiU8ukfkTVI9sj4fUNnxJ48jBj1bZho1e0CM42xgqgTeKOAx7XcwmgOJexiCo2LFTaF0fo66lkpuScV8xUblbj1Q-dpMAsZheLp2FIE-cKwkT-MgeM_y6oKi5NlkIocdEI9vDVaYjXWeDTxW5KhHRMe268l0oPAiE1YqLl1_M901Hhcl3exEb1Aj39E4l6GVc2lTKkfjnI4M3slqEiTo4tlQ3bjrr0mZvytNRRJ66S7F70hhQTEUopUYcvi--KOTsxxu4qWNfg3K40x3ejiJYIRWfUFQ-HAJUpotO2jBXcG4lbkSE2pD0v-NVQQaIy-t7r0l6ZANJ_O1KHTpzQLBN9KSVZIV9Oy4a7rc-eOyDjPzBXswK3151wCrg96zI7VCBpJNNW2Kz2wDF7tqt5mERRz97be92KOkvX8ZymCFjKs_W1vQ0hvEbMnND-_WD9F5L1ThcksEPfXp7f-3Uaoj_q7Xkt647b8paP1pSpa5zod0_RNWKE0CsaA48NpgxdPZsdoyDXZJyyFAh2kG4-Fn6TQYsZBqno9PkbroqwpBhHz7jR1eSAD1WE7jtM0Kuqyz7YHQM2AmIuQk5gEOfGICkh_4TpRWzEbv5B8Hhc50oJXGrRDR5IKWvDuYi984GGiq4k9qUTneRjCW3YtOhGB", // Add your Dropbox access token here
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
