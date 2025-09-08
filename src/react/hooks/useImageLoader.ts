import { isLocalFilePath } from "@utils/utils";
import { useState, useEffect } from "react";

interface UseImageLoaderResult {
  imageSrc: string;
  loading: boolean;
  error: string | null;
}

export function useImageLoader(originalPath: string, fallbackPath: string): UseImageLoaderResult {
  const [imageSrc, setImageSrc] = useState<string>(fallbackPath);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!originalPath || originalPath === "default") {
      setImageSrc(fallbackPath);
      setLoading(false);
      setError(null);
      return;
    }

    const isLocalPath = isLocalFilePath(originalPath);

    if (isLocalPath) {
      setLoading(true);
      setError(null);

      window.electron
        .readLocalFile(originalPath)
        .then((base64Data) => {
          setImageSrc(base64Data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load local image:", err);
          setError(err.message || "Failed to load image");
          setImageSrc(fallbackPath);
          setLoading(false);
        });
    } else {
      setImageSrc(originalPath);
      setLoading(false);
      setError(null);
    }
  }, [originalPath, fallbackPath]);

  return { imageSrc, loading, error };
}
