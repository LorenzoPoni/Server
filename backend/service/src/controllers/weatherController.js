//logica di gestione del post della pagine weather

const fetch = require("node-fetch");// da installare npm install node-fetch@2 -->
//fetch è una funzione che permette di fare richieste HTTP (GET, POST, PUT, DELETE) verso un server o un'API. nel caso non è nativo e va in...

exports.weatherController = async (req, res) => {
    const city = req.body.city;
    const apiKey = "446e332294950ade2b0883908d551808";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            return res.json({
                error: true,
                message: "Città non trovata"
            });
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