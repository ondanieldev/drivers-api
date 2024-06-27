export const restApiConfig = () => {
  const port = process.env.REST_API_PORT || 3000;

  return {
    port,
  };
};
