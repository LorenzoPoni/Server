document.getElementById("weather-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = document.getElementById("city-input").value.trim();
    const resultBox = document.getElementById("weather-result");

    const res = await fetch("/api/v1/weather", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ city })
    });

    const data = await res.json();

    if (data.error) {
        resultBox.innerHTML = `
            <div class="weather-response-box">
                <p>${data.message}</p>
            </div>
        `;
        resultBox.style.display = "block";
        return;
    }

    resultBox.innerHTML = `
          <div class="weather-response-box">
                <p>${data.city}</p>
                <p>${data.description}</p>
                <p>Temperatura: ${data.temperature} °C</p>
                <p>Umidità: ${data.humidity} %</p>
          </div>
    `;

    resultBox.style.display = "block";
});
