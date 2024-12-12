export const getBaseUrl = () => {
  const environment = process.env.NODE_ENV;

  const baseUrl =
    environment === "development"
      ? "http://localhost:3000"
      : `HTTPS://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  return baseUrl;
};
