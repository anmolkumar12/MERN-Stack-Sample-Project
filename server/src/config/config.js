module.exports = {
  node_env: process.env.NODE_ENV,
  app_port: process.env.PORT,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
  },
};
