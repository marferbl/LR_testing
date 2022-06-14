const getDefaultEnvironment = () => {
  return process.env.REACT_APP_BASE_URL;
};

export const buildBackendUrl = (path) => {
  const defaultEnv = getDefaultEnvironment();

  const basePath = defaultEnv;

  const slashlessBasePath = basePath.endsWith("/") ? basePath.substring(0, basePath.length - 1) : basePath;

  const slashlessDir = path.startsWith("/") ? path.substring(1) : path;
  return `${slashlessBasePath}/${slashlessDir}`;
};

export const useBackendUrlBuilder = (path) => {
  return buildBackendUrl(path);
};
