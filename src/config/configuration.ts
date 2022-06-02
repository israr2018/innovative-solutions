import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env;
export default (): any => ({
  PORT:3020,
  SERVER: 'http://localhost:3020',
  DB: {
    MONGODB_URL:
      env.MONGODDB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/medium',
    MONGODB_ADMIN_URL:
      env.MONGODDB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/admin',
  },
  MYSQL: {
    DB_NAME: env.DB_NAME || 'mcz_db',
    USER_NAME: env.USER_NAME || 'root',
    PASSWORD: env.PASSWORD || 'root1234',
    SECONDARY_DB_DATABASE: 'medium_posts',
    SECONDARY_DB_USERNAME: 'root',
    SECONDARY_DB_PASSWORD: 'root1234',
  },
  NODE_ENV:env.NODE_ENV || "development"
})
;
