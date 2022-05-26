
const main = document.querySelector("main");
const weatherReport = document.getElementById("weather");

const API_KEY = "93c26ca2557907bc03a7c42d1b266abd"
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=q=${cityName}&appid=${API_KEY}`;

const getIpAddress = async () => {
    const res = await fetch(IP_API);
    console.log(res);
}





class Weather {
    data = [];
    constructor(cityName) {
        this.cityName = cityName;
        this.getWeather();
    }
    
    async getWeather() {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${API_KEY}`;
        const res = await fetch(API_URL);
        try {
            const data = await res.json();
            this.data.push(data);
            this.buildCard();
        }
        catch (error) {
            console.log("error", error);
        }

    }

    buildCard(){
        // celsius = Math.round(kelvin - 273.15);
        const celsius = Math.round(this.data[0].main.temp - 273.15);
        const feelLike = Math.round(this.data[0].main.feels_like - 273.15);

        const weatherIcon = this.checkWeather();
        // console.log(weatherIcon);
        
        weatherReport.innerHTML = ` <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header text-head">
                        <h3>
                            <a id="delete" class="btn text-head fs-3 px-1" href="">
                                <i class="fas fa-arrow-left"></i>
                            </a>
                            Weather App
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="row border-bottom">
                            <div class="col-md-12">
                                <div class="d-flex flex-column justify-content-around align-items-center gap-2">
                                    <div class="d-flex justify-content-center">
                                        <i class="fa-solid ${weatherIcon} icon"></i>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <h1>
                                            <span class="display-1" id="temp">
                                                ${celsius}
                                            </span>
                                        </h1>
                                        <sup class="mt-4 fs-3">o</sup>
                                        <h1>
                                            <span class="display-1">C</span>
                                        </h1>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <h3 class="display-6">
                                            ${this.data[0].weather[0].description}
                                        </h3>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center gap-2">
                                        <i class="fas fa-location-dot fs-5"></i>
                                        <h3 class="fs-3">
                                            ${this.data[0].name},${this.data[0].sys.country}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="d-flex justify-content-center footer">
                                    <div class="d-flex align-items-center mt-2 gap-2 col-6 justify-content-center">
                                        <div>
                                            <i class="fas fa-temperature-full fs-1 text-head"></i> 
                                        </div>
                                        <div class="d-flex flex-column">
                                            <div class="d-flex">
                                                <h6 class="fs-3">${feelLike}</h6>
                                                <sup class="mt-2 fs-6">o</sup>
                                                <h6 class="fs-3">C</h6>
                                            </div>
                                            <div>
                                                <span>
                                                    Feels like
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="feel">
                                    </div>
                                    <div class="d-flex align-items-center mt-2 gap-2 col-6 justify-content-center">
                                        <div>
                                            <i class="fa-solid fa-droplet fs-1 text-head"></i> 
                                        </div>
                                        <div class="d-flex flex-column">
                                            <div>
                                                <h6 class="fs-3">
                                                    ${this.data[0].main.humidity}%
                                                </h6>
                                            </div>
                                            <div>
                                                <span>
                                                    Humidity
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    this.data = [];


    const deleteBtn = document.getElementById("delete");
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.data = [];
        weatherReport.innerHTML = "";
    });

    

    // main.appendChild(section);

    }

    checkWeather() {
        switch (this.data[0].weather[0].main) {
            case "Clear":
            return "fa-sun";
            case "Clouds":
            return "fa-cloud";
            case "Rain":
            return "fa-cloud-rain";
            case "Snow":
            return "fa-snowflake";
            case "Thunderstorm":
            return "fa-bolt";
            case "Drizzle":
            return "fa-cloud-rain";
            case "Mist":
            return "fa-smog";
            default:
            return "fa-sun";
        }

    }

}


const inputSearch = document.getElementById("city");
inputSearch.addEventListener("keyup", (e) => {
    e.preventDefault();
    
    if (e.keyCode === 13 && inputSearch.value !== "") {
        weatherReport.innerHTML="";
        const cityName = inputSearch.value;
        new Weather(cityName);
        inputSearch.value = ""
    }
});

const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    getLocation();
    // find ip address locatoin

});

// find device location 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


function showPosition(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            const cityName = data.name;
            new Weather(cityName);
        })
        .catch(error => console.log("error", error));
}