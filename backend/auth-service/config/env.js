const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    AUTH_PORT: parseInt(process.env.AUTH_PORT || "3001"),
    SESSION_SECRET: process.env.SESSION_SECRET || 'dev-session-secret-change-me',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4000/api/v1/',
    NODE_ENV: process.env.NODE_ENV || 'development',
}