import { Dropbox } from "dropbox";
import { DROPBOX_CONFIG } from "../utils/constants";
import { getDateCutoff } from "../utils/dateUtils";

class DropboxService {
  constructor() {
    this.customFetch = async (url, options) => {
      const proxyUrl = url.replace("https://api.dropboxapi.com", "/dropbox");
      const proxyContentUrl = url.replace(
        "https://content.dropboxapi.com",
        "/content"
      );
      const finalUrl = proxyUrl.startsWith("/dropbox")
        ? proxyUrl
        : proxyContentUrl;

      return fetch(finalUrl, options);
    };

    this.dbx = new Dropbox({
      accessToken: DROPBOX_CONFIG.accessToken,
      fetch: this.customFetch,
    });

    // Cache for temporary links
    this.linkCache = new Map();
    this.cacheExpiry = 4 * 60 * 60 * 1000; // 4 hours
  }

  // COMPLETE METHOD - This was missing from your file!
  async getLocationImages(dropboxPath, maxImages = 10, daysBack = 7) {
    try {
      console.log(`Fetching images from ${dropboxPath}...`);

      // List files in the specified folder
      const response = await this.dbx.filesListFolder({ path: dropboxPath });
      const files = response.result.entries;

      console.log(`Found ${files.length} files in ${dropboxPath}`);

      // Filter for image files
      const imageFiles = files.filter((file) =>
        file.name.match(/\.(jpg|jpeg|png|gif)$/i)
      );

      // Filter by date if needed (optional - you can skip this for testing)
      let filteredImages = imageFiles;
      if (daysBack < 365) {
        const cutoffDate = getDateCutoff(daysBack);
        filteredImages = imageFiles.filter((file) => {
          const fileDate = new Date(file.server_modified);
          return fileDate >= cutoffDate;
        });
      }

      // Sort by most recent first and limit
      const sortedImages = filteredImages
        .sort(
          (a, b) => new Date(b.server_modified) - new Date(a.server_modified)
        )
        .slice(0, maxImages);

      console.log(`Processing ${sortedImages.length} images...`);

      // Get temporary links - NO DELAYS!
      const imageUrls = await Promise.all(
        sortedImages.map(async (file) => {
          try {
            const linkResponse = await this.dbx.filesGetTemporaryLink({
              path: file.path_lower,
            });

            return {
              id: file.id,
              name: file.name,
              url: linkResponse.result.link,
              path: file.path_lower,
              modified: new Date(file.server_modified),
              size: file.size || 0,
            };
          } catch (linkError) {
            console.error(`Failed to get link for ${file.name}:`, linkError);
            return null;
          }
        })
      );

      // Filter out failed links
      const validImages = imageUrls.filter((img) => img !== null);
      console.log(`Successfully processed ${validImages.length} images`);

      return validImages;
    } catch (error) {
      console.error(`Error fetching images from ${dropboxPath}:`, error);
      throw new Error(
        `Failed to load images from ${dropboxPath}: ${error.message}`
      );
    }
  }

  async checkFolderExists(dropboxPath) {
    try {
      await this.dbx.filesGetMetadata({ path: dropboxPath });
      return true;
    } catch (error) {
      console.log(`Folder ${dropboxPath} not accessible:`, error.message);
      return false;
    }
  }

  clearExpiredCache() {
    // Simple version - no cache for now to avoid complexity
    if (this.linkCache) {
      this.linkCache.clear();
    }
  }
}

export const dropboxService = new DropboxService();
export default DropboxService;
