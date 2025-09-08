export function getFileNameFromPath(path: string): string {
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1].split(".")[0];
}

export function isLocalFilePath(path: string): boolean {
  if (/^[A-Za-z]:\\/.test(path)) {
    return true;
  }

  if (path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/src/")) {
    return true;
  }

  if (path.startsWith("\\\\")) {
    return true;
  }

  return false;
}
