import { useImageLoader } from "@hooks/useImageLoader";

interface AvatarImageProps {
  path: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  onError?: () => void;
}

const defaultAvatarPath = "/src/react/assets/general/dso.png";

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

export function AvatarImage({ path, alt = "Avatar", className = "", size = "sm", onError }: AvatarImageProps) {
  const { imageSrc, loading, error } = useImageLoader(path, defaultAvatarPath);

  const handleError = () => {
    onError?.();
  };

  if (loading) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-base-300 animate-pulse flex items-center justify-center ${className}`}
      >
        <span className="text-xs text-gray-500">...</span>
      </div>
    );
  }

  if (error) {
    console.warn("Avatar loading error:", error);
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      onError={handleError}
    />
  );
}
