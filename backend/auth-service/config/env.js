require('dotenv').config();

module.exports = {
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    AUTH_PORT: parseInt(process.env.AUTH_PORT || "3001"),
    SESSION_SECRET: process.env.SESSION_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:4000/api/v1/",
}