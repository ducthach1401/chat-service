// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('dotenv').config().parsed;

module.exports = {
  type: config.DB_TYPE,
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  logging: config.DB_LOGGING,
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
};
