//Controllo del nome della città
function validateCity(city) {
    if (typeof city !== "string") {
        return false;
    }

    const trimmedCity = city.trim();
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'’.-]+$/;

    return trimmedCity.length > 1 && regex.test(trimmedCity);
}

module.exports = { validateCity };