export const getEnv = (key: string): string => {
  const param = process.env[key];
  if (!param) {
    throw new Error(`No ${key} was provided`);
  }

  return param;
};
