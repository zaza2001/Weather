### **Milestone 2: Fetching & Displaying Current Weather**


**Goal:** Fetch live data from the WeatherAPI and use it to populate the "Current Weather" section for a default city when the page loads.


#### **Detailed Tasks & Implementation Guide:**


**1. JavaScript Setup (`script.js`):**
*   **Constants and State:** At the top of your script, define your core variables.
   ```javascript
   // IMPORTANT: Replace with your own key from WeatherAPI.com
   const API_KEY = "YOUR_API_KEY_HERE";
   const BASE_URL = "https://api.weatherapi.com/v1";
  
   let currentCity = "New York"; // This is our default city
   ```
*   **DOM Element References:** Get references to all the HTML elements you'll need to interact with. This is crucial for performance, as you're only querying the DOM once.
   ```javascript
   const currentWeatherDetails = document.getElementById('current-weather-details');
   // Add more for the loader, error container, etc.
   ```


**2. The Main Fetch Function:**
*   Create an `async` function. This `async` keyword is essential because `fetch` is an asynchronous operation.
   ```javascript
   async function fetchAndRenderWeather(city) {
      try {
          const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`);
         
          if (!response.ok) {
              // For now, just log an error if something goes wrong.
              // We will handle this properly in a later milestone.
              console.error("API request failed!");
              return;
          }


          const data = await response.json();
         
          // Log the data to see its structure
          console.log(data);


          // Call the function to render the data
          renderCurrentWeather(data);


      } catch (error) {
          console.error("An error occurred:", error);
      }
   }
   ```


**3. The Rendering Function:**
*   Create a dedicated function to handle the DOM manipulation. This keeps your code clean.
   ```javascript
   function renderCurrentWeather(data) {
      // Extract the data you need using the data guide
     


      // Build the HTML string
      const html = `
          build html with data here
      `;


      // Update the DOM
      const currentWeatherDetails = document.getElementById('current-weather-details')
      currentWeatherDetails.innerHTML = html;
   }
   ```


**4. Initialization:**
*   Finally, create an `init` function and call it to start the application.
   ```javascript
   function init() {
      fetchAndRenderWeather(currentCity);
   }


   init();
   ```


### **Guide to Using the WeatherAPI.com Data**


When you make a successful call to the WeatherAPI.com `forecast.json` endpoint, the server sends back a large JSON object containing a wealth of information. Our job is not to use everything, but to pick out the specific pieces of data we need to build our dashboard's features.


#### **A Look at the JSON Structure**


The response is a nested JavaScript object. Think of it like a set of folders inside other folders. To get a piece of data, you need to follow the correct path. For example, to get the city name, the path is `location.name`.


Here is a simplified example of the JSON structure you will receive. We've removed many fields to make it easier to see the ones we need.


```json
{
 // 1. Information about the location you searched for
 "location": {
   "name": "New York",
   "country": "United States of America"
 },


 // 2. The current, up-to-the-minute weather conditions
 "current": {
   "temp_c": 25.0,
   "condition": {
     "text": "Sunny",
     "code": 1000
   },
   "wind_kph": 12.0,
   "humidity": 65,
   "vis_km": 10.0,
   "uv": 6.0
 },


 // 3. The forecast, which contains an array of upcoming days
 "forecast": {
   "forecastday": [
     { // Day 1 (Today)
       "date": "2025-08-16",
       "day": {
         "maxtemp_c": 27.0,
         "mintemp_c": 18.0,
         "condition": {
           "text": "Sunny",
           "code": 1000
         }
       }
     },
     { // Day 2 (Tomorrow)
       "date": "2025-08-17",
       "day": {
         "maxtemp_c": 24.0,
         "mintemp_c": 16.0,
         "condition": {
           "text": "Partly cloudy",
           "code": 1003
         }
       }
     }
     // ... more days would follow
   ]
 }
}
```


---


### **Data Fields by Feature**


Below is a table detailing exactly which fields to use for each part of your dashboard.


#### **1. For the Current Weather Display**


This section uses data from the `location` and `current` objects.


| Field Path               | What it Means                                       | How to Use It                                                                                                                                                                    |
| :----------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `location.name`          | The name of the city.                               | Display this as the main heading, e.g., in an `<h1>` tag.                                                                                                                        |
| `location.country`       | The country where the city is located.              | Display this next to the city name for clarity.                                                                                                                                  |
| `current.temp_c`         | The current temperature in Celsius.                 | Display this as the large temperature. Use `Math.round()` to show it as a whole number (e.g., `25` instead of `25.0`).                                                           |
| `current.condition.code` | A unique number representing the weather condition. | **Very Important:** Do not display this number. Pass this code to your `getWeatherCondition()` helper function to get the simplified text (e.g., 'sunny') needed for your icons. |
| `current.humidity`       | The current humidity as a percentage.               | Display this value in the "Humidity" detail section.                                                                                                                             |
| `current.wind_kph`       | The current wind speed in kilometers per hour.      | Display this value in the "Wind Speed" detail section. Use `Math.round()` for a cleaner look.                                                                                    |


#### **2. For the 5-Day Forecast**


This section uses the `forecast.forecastday` array. You will need to **loop** through this array to create each of the 5 forecast cards. For each item in the array (let's call it `forecastDay` in your loop):


| Field Path                       | What it Means                                             | How to Use It                                                                                                                                                   |
| :------------------------------- | :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forecastDay.date`               | The date for this forecast day (e.g., "2025-08-17").      | Pass this string to your `getDayName()` helper function to convert it into "Sunday", "Monday", etc. For the first day in the array, you can display "Today".    |
| `forecastDay.day.maxtemp_c`      | The maximum expected temperature for that day in Celsius. | This is the "high" temperature for the forecast card. Use `Math.round()` to show a whole number.                                                                |
| `forecastDay.day.mintemp_c`      | The minimum expected temperature for that day in Celsius. | This is the "low" temperature for the forecast card. Use `Math.round()` to show a whole number.                                                                 |
| `forecastDay.day.condition.code` | The weather condition code for that day.                  | Just like with the current weather, pass this code to your `getWeatherConditionIcon()` helper function to get the right icon/condition text for each forecast card. |


#### **3. For the Additional Details Section**


This section uses a few more fields from the `current` object.


| Field Path               | What it Means                                                        | How to Use It                                                                                                                    |
| :----------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `current.vis_km`         | Visibility in kilometers.                                            | Display this value in the "Visibility" detail card.                                                                              |
| `current.uv`             | The UV (Ultraviolet) Index.                                          | Display this value in the "UV Index" detail card.                                                                                |
| `current.condition.text` | A descriptive text of the current condition (e.g., "Partly cloudy"). | Display this text directly in the "Condition" detail card. This is useful for more specific descriptions than our icons provide. |


---


Write `getWeatherCondition(code)` function to get text corresponding to weather condition


Below is the conditon code to condition text map
```javascript
const conditionCodeToTextMap = {
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
```
Write `getWeatherConditionIcon(code)` function to get icon name corresponding to weather condition
Below is the condition code to condition icon map
```javascript
const conditionCodeToIconMap = {
   1000: 'sunny.svg', 1003: 'partly-cloud.svg' //Complete rest of the icons
};
```




#### **Code Review Checklist (Milestone 2):**


*   [ ] Is the API key stored in a constant?
*   [ ] Is `async/await` used correctly for the `fetch` call?
*   [ ] Does the `renderCurrentWeather` function correctly extract and display data from the API response?
*   [ ] When the page is loaded, does the hardcoded "New York" data get replaced by live data from the API?
*   [ ] Is the API response being logged to the console for debugging?

