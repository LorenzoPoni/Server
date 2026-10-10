//logica di gestione del post della pagine weather

const fetch = require("node-fetch");
const { getWeather } = require("../utils/apiClient");
const { WEATHER_API_KEY } = require("../utils/constants");
const { validateCity } = require("../utils/validatecity");
// da installare npm install node-fetch@2 -->
//fetch è una funzione che permette di fare richieste HTTP (GET, POST, PUT, DELETE) verso un server o un'API. nel caso non è nativo e va in...

exports.weatherController = async (req, res) => {
    const city = req.body.city;

    if (!validateCity(city)) {
        return res.json({ error: true, message: "Città non valida" });
    }

    try {
        const data = await getWeather(city, WEATHER_API_KEY);

        if (data.cod !== 200) {
            return res.json({error: true, message: "Città non trovata"});
        }

        res.json({
            city: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed
        });

    } catch (err) {
        console.error(err);
        res.json({
            error: true,
            message: "Errore nel server"
        });
    }
};