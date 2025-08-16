### **Project Guide & Milestones: Building a Weather Dashboard**


Welcome to the Weather Dashboard project! This guide will walk you through building a complete, single-page weather application from scratch using only HTML, CSS, and pure JavaScript. The project is broken down into five milestones. Complete the tasks for each milestone in order and submit your code for review before moving on.


---


### **Milestone 1: The Static Foundation (HTML & CSS)**


**Goal:** Create the complete visual layout of the weather dashboard using HTML and CSS. By the end of this milestone, your page should look like the final product but with placeholder data. It will not be functional yet.


#### **Detailed Tasks & Implementation Guide:**


**1. Project Setup:**
*   Create a new folder named `weather-dashboard`.
*   Inside this folder, create three files:
   *   `index.html`
   *   `style.css`
   *   `script.js` (this will remain empty for now)
*   Open `index.html` and set up the basic HTML boilerplate.
*   In the `<head>` of `index.html`, link your stylesheet:
   ```html
   <link rel="stylesheet" href="style.css">
   ```
*   Just before the closing `</body>` tag, link your script file. It's important to do this at the end so the HTML is loaded before the script tries to run.
   ```html
   <script src="script.js"></script>
   ```


**2. HTML Structure (`index.html`):**
Your goal is to build the skeleton of the application. Use the following structure as a guide. Pay close attention to the `id` and `class` attributes, as we will need them later for styling and JavaScript.


```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Weather Dashboard</title>
   <link rel="stylesheet" href="style.css">
</head>
<body>
   <div class="container">
       <header class="app-header">
           <h1>Weather Dashboard</h1>
       </header>


       <main>
           <!-- These elements will be controlled by JS later -->
           <div id="loader" style="display: none;">Loading...</div>
           <div id="error-container" style="display: none;"></div>


           <div id="weather-content">
               <!-- Current Weather & Search Card -->
               <section class="card">
                   <form id="search-form">
                       <input id="city-input" type="text" placeholder="Enter city name...">
                       <button type="submit" class="btn">Search</button>
                   </form>
                   <!-- Hardcoded placeholder data for styling -->
                   <div id="current-weather-details">
                       <h1>New York</h1>
                       <p class="muted-text">Saturday, August 16, 2025</p>
                       <div class="current-main">
                           <div class="current-temp">25°C</div>
                           <div class="current-condition">Sunny</div>
                       </div>
                       <div class="current-details">
                           <div>Humidity: 65%</div>
                           <div>Wind: 12 km/h</div>
                       </div>
                   </div>
               </section>


               <!-- Popular Cities -->
               <section>
                   <h3>Popular Cities</h3>
                   <div id="popular-cities-buttons" class="btn-group">
                       <!-- Hardcode a few buttons for styling -->
                       <button class="btn btn-outline active">New York</button>
                       <button class="btn btn-outline">London</button>
                       <button class="btn btn-outline">Tokyo</button>
                   </div>
               </section>


               <!-- 5-Day Forecast -->
               <section>
                   <h2>5-Day Forecast</h2>
                   <div id="forecast-cards-container" class="grid-5">
                       <!-- Hardcode one card for styling -->
                       <div class="card forecast-card">
                           <p class="day">Today</p>
                           <p class="condition">Sunny</p>
                           <p class="temp-high">27°</p>
                           <p class="temp-low muted-text">18°</p>
                       </div>
                       <!-- You can copy-paste this card 4 more times -->
                   </div>
               </section>
              
                <!-- Additional Details -->
               <section>
                   <h3>Additional Details</h3>
                   <div id="additional-details-container" class="grid-4">
                       <div class="card detail-card">
                           <p class="muted-text">Visibility</p>
                           <p>10 km</p>
                       </div>
                       <div class="card detail-card">
                           <p class="muted-text">UV Index</p>
                           <p>6</p>
                       </div>
                   </div>
               </section>
           </div>
       </main>
   </div>
   <script src="script.js"></script>
</body>
</html>
```


**3. CSS Styling (`style.css`):**
Now, bring your HTML to life.


*   **Define CSS Variables:** At the top of your `style.css`, define variables in the `:root`. This makes your design consistent.
   ```css
   :root {
    --background: #f9fafb;
    --foreground: #1f2937;
    --card: #ffffff;
    --primary: #111827;
    --primary-foreground: #ffffff;
    --muted-text: #6b7280;
    --border: #e5e7eb;
    --radius: 0.75rem;
   }
   ```
*   **Global Styles:** Apply basic styles to the `body` (font-family, colors) and the main `.container` (max-width, margin).
*   **Component Styles:** Create classes for your repeating elements.
   *   `.card`: Give it a background color, border, padding, and border-radius.
   *   `.btn`: Style the main button.
   *   `.btn-outline`: Style the secondary buttons and add an `.active` state that gives it the same appearance as the primary button.
   *   `.input`: Style the search input field.
*   **Layouts:** Use modern CSS for layouts.
   *   Use **Flexbox** on `#search-form` to place the input and button side-by-side.
   *   Use **Flexbox** on `.current-main` and `.current-details` to align the temperature, condition, humidity, etc.
   *   Use **CSS Grid** for `#forecast-cards-container`. A good starting point is:
       ```css
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
       gap: 1rem;
       ```


#### **Code Review Checklist (Milestone 1):**


*   [ ] Do all three files (`index.html`, `style.css`, `script.js`) exist and are they correctly linked?
*   [ ] Does the HTML contain all the required sections with the specified IDs?
*   [ ] Is the CSS using variables for colors and is the styling applied to all elements?
*   [ ] Is the layout responsive? (Test by resizing the browser window).

