require("dotenv").config();

const requiredVars = ["WEATHER_API_KEY", "PORT"];

requiredVars.forEach(key => {
    if (!process.env[key]) {
        console.error(`La variabile ${key} non è stata trovata. Assicurati di avere un file .env con tutte le variabili necessarie.`);
        process.exit(1);
    }
});

module.exports = {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    PORT: parseInt(process.env.PORT, 10)
};