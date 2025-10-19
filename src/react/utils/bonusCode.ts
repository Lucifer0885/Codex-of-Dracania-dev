export const calculateProgress = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();

  if (now < start) return 0;
  if (now > end) return 100;

  const total = end - start;
  const elapsed = now - start;
  return Math.round((elapsed / total) * 100);
};

export const getProgressColor = (progress: number): string => {
  if (progress === 0) return "progress-info";
  if (progress < 25) return "progress-success";
  if (progress < 75) return "progress-warning";
  if (progress < 100) return "progress-error";
  return "progress-accent";
};

export const isActive = (startDate: Date, endDate: Date): boolean => {
  const now = Date.now();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return now >= start && now <= end;
};
