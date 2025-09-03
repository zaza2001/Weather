const API_KEY = "1edf98459d3a43caaed173225252708";
const BASE_URL = "https://api.weatherapi.com/v1";
let currentCity = "Tbilisi";
const searhForm = document.getElementById("search-form"); 
const cityInput = document.getElementById("city-input");

searhForm.addEventListener("click", () => { // არაა დასრულებული
    const newCity = cityInput.value.trim();
    if (newCity) {
        currentCity = newCity;
        fetchAndRenderWeather(currentCity);
    }
});


async function fetchAndRenderWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`);

        if (!response.ok) {
            console.error("API request failed!");
            return;
        }

        const data = await response.json();


        renderCurrentWeather(data);
        renderAditional(data);
        renderFiveDayForecast(data);

    } catch (error) {
        console.error("An error occurred:", error);
    }
}
function renderCurrentWeather(data) {
    const city = data.location.name;
    const country = data.location.country;
    const temp = Math.round(data.current.temp_c);
    const humidity = data.current.humidity;
    const wind = Math.round(data.current.wind_kph);
    const code = data.current.condition.code;
    const imgCode = conditionCodeToIconMap[code];
    const alternative = data.current.condition.text;

    const html = `
                            <div id="current-weather-details">
                            <h1 class="headCity" id="headCity">${city}, ${country}</h1>
                            <p class="muted-text">${new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            <div class="current-main">
                                <div class="current-temp">
                                    <img src="./Img/${imgCode}" class="vector" alt="${alternative}"><span>${temp}°C</span>
                                </div>
                            </div>
                            <div class="current-details">
                                <div class="detail">
                                    <img src="./Img/humidity.svg" alt="Humidity" class="humidity">
                                    <div>
                                        <p>Humidity</p>
                                        <p>${humidity}%</p>
                                    </div>
                                </div>

                                <div class="details">
                                    <img src="./Img/wind-speed.svg" alt="Wind" class="wind">
                                    <div>
                                        <p>Wind Speed</p>
                                        <p>${wind} km/h</p>
                                    </div>
                                </div>
                            </div>
                            </div>
    `;
    const currentWeatherDetails = document.getElementById('current-weather-details');
    currentWeatherDetails.innerHTML = html;
}
function init() {
    fetchAndRenderWeather(currentCity);
}


init();
const conditionCodeToTextMap = { // -----------აკლია ამინდის Condition_ები-------------
    1000: 'sunny', 1003: 'partly cloudy', 1006: 'cloudy', 1009: 'cloudy',
    1030: 'fog', 1063: 'rain', 1066: 'snow', 1069: 'sleet', 1072: 'drizzle',
    1087: 'thunderstorm', 1114: 'heavy snow', 1117: 'heavy snow', 1135: 'fog',
    1147: 'fog', 1150: 'drizzle', 1153: 'drizzle', 1168: 'drizzle', 1171: 'drizzle',
    1180: 'rain', 1183: 'rain', 1186: 'rain', 1189: 'rain', 1192: 'heavy rain',
    1195: 'heavy rain', 1198: 'rain', 1201: 'heavy rain', 1204: 'sleet',
    1207: 'sleet', 1210: 'snow', 1213: 'snow', 1216: 'snow', 1219: 'snow',
    1222: 'heavy snow', 1225: 'heavy snow', 1237: 'hail', 1240: 'rain',
    1243: 'heavy rain', 1246: 'heavy rain', 1249: 'sleet', 1252: 'sleet',
    1255: 'snow', 1258: 'heavy snow', 1261: 'hail', 1264: 'hail',
    1273: 'thunderstorm', 1276: 'thunderstorm', 1279: 'thunderstorm', 1282: 'thunderstorm',
};
const conditionCodeToIconMap = {
    1000: 'sunny-clear.svg', 1003: 'partly-cloudy.svg', 1006: 'cloudy.svg', 1009: 'cloudy.svg',
    1030: 'fog.svg', 1063: 'light-rain.svg', 1066: 'heavy-snow.svg', 1069: 'sleet.svg', 1072: 'drizzle.svg',
    1087: 'thunderstorm.svg', 1114: 'heavy-snow.svg', 1117: 'heavy-snow.svg', 1135: 'fog.svg',
    1147: 'fog.svg', 1150: 'drizzle.svg', 1153: 'drizzle.svg', 1168: 'drizzle.svg', 1171: 'drizzle.svg',
    1180: 'heavy-rain.svg', 1183: 'heavy-rain.svg', 1186: 'heavy-rain.svg', 1189: 'heavy-rain.svg', 1192: 'heavy-rain.svg',
    1195: 'heavy-rain.svg', 1198: 'heavy-rain.svg', 1201: 'heavy-rain.svg', 1204: 'sleet.svg',
    1207: 'sleet.svg', 1210: 'heavy-snow.svg', 1213: 'heavy-snow.svg', 1216: 'heavy-snow.svg', 1219: 'heavy-snow.svg',
    1222: 'heavy-snow.svg', 1225: 'heavy-snow.svg', 1237: 'hail.svg', 1240: 'heavy-rain.svg',
    1243: 'heavy-rain.svg', 1246: 'heavy-rain.svg', 1249: 'sleet.svg', 1252: 'sleet.svg',
    1255: 'heavy-snow.svg', 1258: 'heavy-snow.svg', 1261: 'hail.svg', 1264: 'hail.svg',
    1273: 'thunderstorm.svg', 1276: 'thunderstorm.svg', 1279: 'thunderstorm.svg', 1282: 'thunderstorm.svg',
};


function renderAditional(data) {
    const aditionalDetail = document.getElementById("additional-details-container");
    const km = data.current.vis_km;
    const uv = data.current.uv;
    const details = data.current.condition.text;
    const aditonal = `
        <div id="additional-details-container" class="grid-4">
                            <div class="card detail-card">
                                <p class="muted-text">Visibility</p>
                                <p class="muted-text1">${km}km</p>
                            </div>
                            <div class="card detail-card">
                                <p class="muted-text">UV Index</p>
                                <p class="muted-text1">${uv}</p>
                            </div>
                            <div class="card detail-card">
                                <p class="muted-text">Condition</p>
                                <p class="muted-text1">${details}</p>
                            </div>
                            <div class="card detail-card">
                                <p class="muted-text">Data Source</p>
                                <p class="muted-text1">Live API</p>
                            </div>
                        </div>
        `;
    aditionalDetail.innerHTML = aditonal;
}
function renderFiveDayForecast(data) {
    const forecastContainer = document.getElementById("forecast-cards-container");
    forecastContainer.innerHTML = "";
    const forecastDays = data.forecast.forecastday;
    forecastDays.forEach(forecast => {
        const date = forecast.date;
        const maxTemp = forecast.day.maxtemp_c;
        const minTemp = forecast.day.mintemp_c;
        const code = forecast.day.condition.code;
        const imgCode = conditionCodeToIconMap[code];
        const altText = data.current.condition.text;
        const fiveDayForecast = `
            
                            <!-- Hardcode one card for styling -->
                            <div class="card forecast-card">
                                <p class="day">${date}</p>
                                <img class="weathers" src="./Img/${imgCode}" alt="${altText}">
                                <p class="temp-high">${maxTemp}°</p>
                                <p class="temp-low muted-text">${minTemp}°</p>
                            </div>
            `

        forecastContainer.innerHTML += fiveDayForecast;


    })
}

