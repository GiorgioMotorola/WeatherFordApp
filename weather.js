function getWeather() {
    const apiKey = 'b5f7bc717799c13af6c652a35002edd6';
    const zipCode = document.getElementById('zip').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherInfoDiv = document.getElementById('weather-info');
            weatherInfoDiv.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        });
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = '';

    // Check if the API response contains the 'weather' and 'main' properties
    if (!data.weather || !data.weather[0] || !data.main) {
        weatherInfoDiv.innerHTML = '<p>Weather data not available</p>';
        return;
    }

    const cityName = data.name;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;

    const weatherData = `
        <p>City: ${cityName}</p>
        <p>Description: ${description}</p>
        <p>Temperature: ${temperature} &#8451;</p>
        <p>Humidity: ${humidity}%</p>
    `;

    weatherInfoDiv.innerHTML = weatherData;
}
