require('dotenv').config();

module.exports = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  serverPort: process.env.PORT,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
}