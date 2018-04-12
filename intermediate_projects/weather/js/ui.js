const UI = (function() {
    const weather = document.getElementById("weather"),
        BTNS = document.querySelector('.btns'),
        FORM = document.getElementById("city-name");
        
    const successHandler = data =>{
        weather.innerHTML = "";
        let tempC = parseInt(data.main.temp - 273.15),
            tempF = parseInt(tempC * 1.8 + 32);
        let temperature = tempC;
        let card = `<div class="weather">
          <h2 class="city">${data.name}</h2>
          <p class="date">${App.getTime()}</p>
          <p class="condition">${data.weather[0].main}</p>
          <p class="temperature">${temperature} \xB0 C</p>
        </div>`;

        BTNS.addEventListener('click', function (e) {
            var target = e.target;
            if (target.tagName == 'BUTTON') {
                if (target.textContent == 'C') {
                    temperature = tempC;
                    document.querySelector(".temperature").textContent = tempC;
                } else if (target.textContent == 'F') {
                    document.querySelector(".temperature").textContent = tempF;
                }
            }
        }); //end event listener buttons

        weather.innerHTML+=card;
    };
    
    //error handler if data can not be fetched
    const error = () => {
      document.querySelector('.error').style.display = "block";
      setTimeout(()=>{
          document.querySelector('.error').style.display = "none";
      },3000);
    };
        
    const fetchByCoords = position => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        API.fetchByGeolocation(lat, long).then(successHandler);
    };
    
    const fetchByName = () => {
        FORM.addEventListener("submit", e=>{
           e.preventDefault();
           let cityName = document.querySelector(".city-name").value;
           return new Promise((resolve, reject)=>{
              if(cityName) resolve(API.fecthByName(cityName));
              else reject("Name not avaible");
           }).then(successHandler).catch(error);
        });//end form submit event
    };
      
    const getDataByCoords = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchByCoords, fetchByName);
        } else {
            error();
        }
    };
    
    document.addEventListener("DOMContentLoaded",()=>{
        getDataByCoords();
        fetchByName();
    });
}());