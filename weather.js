let weather = {
    apiKey: "4aca9951f3aa4c346444f87e4c75daeb", // Insert the APIKey here
    cities: [
        "Berlin",      // Berlin
        "Hamburg",     // Hamburg
        "München",     // Bayern
        "Köln",        // Nordrhein-Westfalen
        "Frankfurt",   // Hessen
        "Stuttgart",   // Baden-Württemberg
        "Düsseldorf",  // Nordrhein-Westfalen
        "Dresden",     // Sachsen
        "Leipzig",     // Sachsen
        "Hannover",    // Niedersachsen
        "Nürnberg",    // Bayern
        "Bremen",      // Bremen
        "Dortmund",    // Nordrhein-Westfalen
        "Essen",       // Nordrhein-Westfalen
        "Duisburg",    // Nordrhein-Westfalen
        "Bochum",      // Nordrhein-Westfalen
        "Wuppertal",   // Nordrhein-Westfalen
        "Bonn",        // Nordrhein-Westfalen
        "Bielefeld",   // Nordrhein-Westfalen
        "Münster",     // Nordrhein-Westfalen
        "Karlsruhe",   // Baden-Württemberg
        "Mannheim",    // Baden-Württemberg
        "Augsburg",    // Bayern
        "Wiesbaden",   // Hessen
        "Gelsenkirchen", // Nordrhein-Westfalen
        "Mönchengladbach", // Nordrhein-Westfalen
        "Braunschweig",   // Niedersachsen
        "Chemnitz",       // Sachsen
        "Kiel",           // Schleswig-Holstein
        "Aachen"          // Nordrhein-Westfalen
        // Insert other state capitals here...
    ],
    currentCityIndex: 0, // Current index of the city in the list
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey +
            "&lang=de"
        )
            .then((response) => {
                if (!response.ok) {
                    alert("Es wurde kein Wetter gefunden.");
                    throw new Error("Es wurde kein Wetter gefunden.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    // Function to display the weather in the HTML page
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        // Convert temperature to whole number (integer)
        const tempInWholeNumber = parseInt(temp);

        // Update the corresponding elements in the HTML page
        document.querySelector(".city").innerText = "Wetter in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = tempInWholeNumber + "°C"; // Display whole number temperature
        document.querySelector(".humidity").innerText =
            "Luftfeuchtigkeit: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Windstärke: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");

    },
    // Function to change the city and update the weather
    search: function () {
        this.fetchWeather(this.cities[this.currentCityIndex]); // Retrieve current city
        this.currentCityIndex = (this.currentCityIndex + 1) % this.cities.length; // Go to the next city index
    },
};

// Get weather for the first city and then update every 5 minutes
weather.search();
setInterval(function () {
    weather.search();
}, 5 * 60 * 1000); // 5 minutes converted into milliseconds
