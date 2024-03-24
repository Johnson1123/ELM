export const getHoursMinute = (total: number) => {
  const h = Math.floor((total / (60 * 60 * 24)) % (60 * 60));
  const m = Math.floor((total / (60 * 60)) % 60);
  return [h, m];
};

export const apiDomain = (): string => {
  if (process.env.NODE_ENVIRONMENT == "Development") {
    return process.env.NEXT_PUBLIC_BACKEND_URL || "";
  } else {
    return process.env.API_DEVELOPMENT_URL || "";
  }
};
