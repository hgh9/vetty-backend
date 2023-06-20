const configs = () => ({
  NEST: {
    PORT: process.env.REACT_APP_NEST_LOCAL_PORT,
    HOST:
      process.env.REACT_APP_ENV === "local"
        ? "localhost"
        : process.env.REACT_APP_NEST_HOSTNAME,
  },

  REACT: {
    PORT: process.env.REACT_APP_LOCAL_PORT,
  },
  REDIS: {
    PORT: process.env.REACT_APP_REACT_APP_REDIS_LOCAL_PORT,
    HOST:
      process.env.REACT_APP_ENV === "local"
        ? "localhost"
        : process.env.REACT_APP_REACT_APP_REDIS_HOSTNAME,
  },
})

export default configs
