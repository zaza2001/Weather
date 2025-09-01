const API_KEY = "1edf98459d3a43caaed173225252708";
const BASE_URL = "https://api.weatherapi.com/v1";
let currentCity = "Borjomi";
async function fetchAndRenderWeather(city) {
   try {
       const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`);

       if (!response.ok) {
           console.error("API request failed!");
           return;
       }

       const data = await response.json();


       renderCurrentWeather(data);

   } catch (error) {
       console.error("An error occurred:", error);
   }
}
function renderCurrentWeather(data) {   
   const city = data.location.name;
   const country = data.location.country;
   const temp = data.current.temp_c;
   const humidity = data.current.humidity;
   const wind = data.current.wind_kph;

   const html = `
       <div id="current-weather-details">
                        <h1 class="headCity" id="headCity">${city}, ${country}</h1>
                        <p class="muted-text">${new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <div class="current-main">
                            <div class="current-temp">
                                <img src="./Img/party-cloud.svg" class="vector" alt="Party Cloud"><span>${temp}°C</span>
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
