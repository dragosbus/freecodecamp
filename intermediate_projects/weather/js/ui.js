const UI = (function() {
    const CONTAINER = document.querySelector('.wheather'),
        TEMPERATURE = document.querySelector('.temperature'),
        CITY = document.querySelector('.city'),
        CONDITION = document.querySelector('.condition'),
        NOW = document.querySelector('.date'),
        BTNS = document.querySelector('.btns'),
        FORM = document.getElementById("city-name");
        
    const getTime = () => {
        let time = App.getTime();
        NOW.textContent = time;
    };
        
    const successHandler = data =>{
        CITY.textContent = data.name;
        let tempC = parseInt(data.main.temp - 273.15),
            tempF = parseInt(tempC * 1.8 + 32);
        TEMPERATURE.textContent = tempC + '\xB0 C';

        BTNS.addEventListener('click', function (e) {
            var target = e.target;
            if (target.tagName == 'BUTTON') {
                if (target.textContent == 'C') {
                    TEMPERATURE.textContent = tempC + '\xB0 C';
                } else if (target.textContent == 'F') {
                    TEMPERATURE.textContent = tempF + '\xB0 F';
                }
            }
        }); //end event listener buttons

        let condition = data.weather[0].main;
        CONDITION.textContent = condition;
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
        getTime();
        getDataByCoords();
        fetchByName();
    });
}());