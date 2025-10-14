import type { ProgressBarItem } from "@interfaces/Ievent";

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

export function getEventPages(progress: ProgressBarItem[]): number[] {
  const pages: number[] = [...new Set(progress.map((item) => item.page))].sort((a, b) => a - b);
  return pages;
}

export function getItemsPerPage(progress: ProgressBarItem[], page: number): ProgressBarItem[] {
  const items = progress.filter((item) => item.page === page);
  return items;
}

export function formatName(string: string) {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
}
