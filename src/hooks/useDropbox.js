// Optimized useDropbox Hook
import { useState, useEffect, useCallback, useRef } from "react";
import { dropboxService } from "../services/dropboxService";

export const useDropbox = () => {
  const [locationStats, setLocationStats] = useState({});
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  // Memoized function to prevent unnecessary re-renders
  const getLocationImages = useCallback(
    async (dropboxPath, maxImages = 10, daysBack = 7) => {
      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setLoading(true);
      try {
        const images = await dropboxService.getLocationImages(
          dropboxPath,
          maxImages,
          daysBack
        );

        // Check if request was aborted (only if abortController still exists)
        if (abortControllerRef.current?.signal.aborted) {
          return [];
        }

        return images;
      } catch (error) {
        if (
          error.name === "AbortError" ||
          abortControllerRef.current?.signal.aborted
        ) {
          return [];
        }
        console.error("Error fetching images:", error);
        throw error;
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    },
    []
  );

  const checkFolderExists = useCallback(async (dropboxPath) => {
    return await dropboxService.checkFolderExists(dropboxPath);
  }, []);

  // Optimized location stats loading with parallel processing
  const loadLocationStats = useCallback(async (locations) => {
    setLoading(true);

    try {
      // Process locations in parallel with controlled concurrency
      const BATCH_SIZE = 3; // Process 3 locations at a time
      const results = [];

      for (let i = 0; i < locations.length; i += BATCH_SIZE) {
        const batch = locations.slice(i, i + BATCH_SIZE);

        const batchPromises = batch.map(async (location) => {
          try {
            const recentImages = await dropboxService.getLocationImages(
              location.dropboxPath,
              10, // Reduced from 50 for faster loading
              7
            );

            return {
              id: location.id,
              stats: {
                recentImages: recentImages.length,
                lastActivity:
                  recentImages.length > 0 ? recentImages[0].modified : null,
              },
            };
          } catch (error) {
            console.log(
              `Could not load stats for ${location.name}:`,
              error.message
            );
            return {
              id: location.id,
              stats: {
                recentImages: 0,
                lastActivity: null,
              },
            };
          }
        });

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);

        // Small delay between batches to prevent overwhelming the API
        if (i + BATCH_SIZE < locations.length) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      // Convert array to object
      const stats = results.reduce((acc, { id, stats }) => {
        acc[id] = stats;
        return acc;
      }, {});

      setLocationStats(stats);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Periodically clean expired cache
  useEffect(() => {
    const interval = setInterval(() => {
      dropboxService.clearExpiredCache();
    }, 30 * 60 * 1000); // Every 30 minutes

    return () => clearInterval(interval);
  }, []);

  return {
    locationStats,
    loading,
    getLocationImages,
    checkFolderExists,
    loadLocationStats,
  };
};
