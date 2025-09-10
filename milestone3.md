### **Milestone 3: Displaying the Full Forecast & Adding Helpers**


**Goal:** Populate the 5-day forecast and additional details sections. Abstract repetitive logic into reusable helper functions to keep the code clean and maintainable.


#### **Detailed Tasks & Implementation Guide:**


**1. Create Helper Functions:**
*   These functions will help you process data from the API. Place them near the top of your script.
   ```javascript
   // Converts a date string like "2025-08-17" to "Sunday"
   function getDayName(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { weekday: 'long' });
   }


   // Converts a condition code to a simplified text.
   // This is where you will map the codes provided in the data guide.
   function getWeatherCondition(code) {
      // Refer to the data mapping guide to fill this out.
      // Example:
      if (code === 1000) return 'Sunny';
      if (code === 1003) return 'Partly Cloudy';
      // ... add all other codes
      return 'Unknown'; // A fallback
   }
   ```


**2. Render the Forecast:**
*   Create the `renderForecast` function. It needs to loop through the forecast data.
   ```javascript
   const forecastCardsContainer = document.getElementById('forecast-cards-container');


   function renderForecast(data) {
      // Clear out the old, hardcoded forecast card
      forecastCardsContainer.innerHTML = '';


      // Loop through the forecastday array from the API
      data.forecast.forecastday.forEach((forecastDay, index) => {
          const dayName = (index === 0) ? 'Today' : getDayName(forecastDay.date);
          const condition = getWeatherCondition(forecastDay.day.condition.code);
          const tempHigh = Math.round(forecastDay.day.maxtemp_c);
          const tempLow = Math.round(forecastDay.day.mintemp_c);


          // Create the HTML for one card
          const cardHTML = `
              <div class="card forecast-card">
                  <p class="day">${dayName}</p>
                  <p class="condition">${condition}</p>
                  <p class="temp-high">${tempHigh}°</p>
                  <p class="temp-low muted-text">${tempLow}°</p>
              </div>
          `;
         
          // Add the new card's HTML to the container
          forecastCardsContainer.innerHTML += cardHTML;
      });
   }
   ```


**3. Render Additional Details:**
*   Create a similar `renderAdditionalDetails` function to populate that section.


**4. Update the Main Fetch Function:**
*   In `fetchAndRenderWeather`, after `renderCurrentWeather(data)`, add calls to your new rendering functions:
   ```javascript
   renderForecast(data);
   renderAdditionalDetails(data);
   ```


#### **Code Review Checklist (Milestone 3):**


*   [ ] Are the helper functions (`getDayName`, `getWeatherCondition`) created and working correctly?
*   [ ] Does the `renderForecast` function correctly loop through the `forecastday` array?
*   [ ] Does the UI now display a full 5-day forecast based on live API data?
*   [ ] Is the first forecast day correctly labeled as "Today"?


---



