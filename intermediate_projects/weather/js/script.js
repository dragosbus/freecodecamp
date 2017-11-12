const CONTAINER = document.querySelector('.wheather');
const TEMPERATURE = document.querySelector('.temperature');
const CITY = document.querySelector('.city');
const CONDITION = document.querySelector('.condition');
const NOW = document.querySelector('.date');
const BTNS = document.querySelector('.btns');
let url;

let today = new Date();
let day = today.getDay();
let hour = today.getHours();
let minute = today.getMinutes();
let days = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
let dayNow = today.getDay();

NOW.textContent = days[dayNow]+' ' + hour + ':' + minute;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(ajax);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
getLocation();

function ajax(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=08d6b636cccc477260e8ab2e95047782';

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = myAjax;
  xhr.open('GET', url);
  xhr.send();

  function myAjax() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(xhr.responseText);
      } else {
        error();
      }
    }
  }
}

function success(data) {
  let response = JSON.parse(data);

  CITY.textContent = response.name;

  let tempC = parseInt(response.main.temp - 273.15);
  let tempF = parseInt(tempC * 1.8 + 32);
  TEMPERATURE.textContent = tempC + '\xB0 C';

  BTNS.addEventListener('click',function(e) {
    var target = e.target;
    if(target.tagName == 'BUTTON') {
      if(target.textContent == 'C') {
        TEMPERATURE.textContent = tempC + '\xB0 C';
      } else if(target.textContent == 'F'){
        TEMPERATURE.textContent = tempF + '\xB0 F';
      }
    }
  });//end event listener buttons
  

  let condition = response.weather[0].main;
  CONDITION.textContent = condition;
  //Change the BG of body
  let bg = "linear-gradient(to bottom,rgba(0, 0, 0, 0.4), rgba(250, 250, 250, 0.2))";
  if (CONDITION.textContent === 'Clear' && hour < 17) {
    document.body.style.backgroundImage = bg + ",url('img/clear_day.jpg')";
  } else if(CONDITION.textContent === 'Rain' && hour < 17) {
    document.body.style.backgroundImage = bg + ",url('img/rainy_day.jpg')";
  } else if(CONDITION.textContent === 'Cloudy' && hour < 17) {
    document.body.style.backgroundImage = bg + ",url('img/cloudy_day.jpg')";
  } else if(CONDITION.textContent === 'Clear' && hour > 17) {
    document.body.style.backgroundImage = bg + ",url('img/clear_night.jpg')";
  } else if(CONDITION.textContent === 'Rain' && hour > 17) {
    document.body.style.backgroundImage = bg + ",url('img/rainy_night.jpg')";
  } else if(CONDITION.textContent === 'Cloudy' && hour > 17) {
    document.body.style.backgroundImage = bg + ",url('img/cloudy_night.jpg')";
  }
   
}