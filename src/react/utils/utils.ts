export function getFileNameFromPath(path: string): string {
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1].split(".")[0];
}

export function isLocalFilePath(path: string): boolean {
  // Check for Windows absolute paths (C:\, D:\, etc.)
  if (/^[A-Za-z]:\\/.test(path)) {
    return true;
  }

  // Check for Unix absolute paths (/home/, /usr/, etc.)
  if (path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/src/")) {
    return true;
  }

  // Check for UNC paths (\\server\share)
  if (path.startsWith("\\\\")) {
    return true;
  }

  return false;
}
