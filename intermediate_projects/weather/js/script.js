//start refactoring weather app using fetch api,without jQuery

const CONTAINER = document.querySelector('.wheather'),
      TEMPERATURE = document.querySelector('.temperature'),
      CITY = document.querySelector('.city'),
      CONDITION = document.querySelector('.condition'),
      NOW = document.querySelector('.date'),
      BTNS = document.querySelector('.btns');

let url,
    today = new Date(),
    day = today.getDay(),
    hour = today.getHours(),
    minute = today.getMinutes(),
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'],
    dayNow = today.getDay();

if (minute < 10) {
  NOW.textContent = days[dayNow] + ' ' + hour + ':0' + minute;
} else {
  NOW.textContent = days[dayNow] + ' ' + hour + ':' + minute;
}

(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(ajax, aError);
  } else {
    error();
  }
}());

function aError() {
  url = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=08d6b636cccc477260e8ab2e95047782';
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

//Success handler
function success(data) {
  let response = JSON.parse(data);

  CITY.textContent = response.name;

  let tempC = parseInt(response.main.temp - 273.15),
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

  let condition = response.weather[0].main;
  CONDITION.textContent = condition;
  //Change the BG of body
  function bodyBG(image) {
    let bg = "linear-gradient(45deg,rgba(0, 0, 0, 0.6) 65%, rgba(250, 250, 250, 0.34))";
    if (window.innerWidth < 800) {
      document.body.style.backgroundImage = bg + ",url('img/sm/" + image + "')";
    } else {
      document.body.style.backgroundImage = bg + ",url('img/" + image + "')";
    }
  
  }
  
  if (CONDITION.textContent === 'Clear' && hour < 17) {
    bodyBG('clear_day.jpg');
  } else if (CONDITION.textContent === 'Rain' && hour < 17) {
    bodyBG('rain.jpg');
  } else if (CONDITION.textContent === 'Clouds' && hour < 17) {
    document.body.innerHTML += `<video playsinline autoplay muted loop><source src="img/cloud.mp4" type="video/mp4"></video>`;
  } else if (CONDITION.textContent === 'Clear' && hour >= 17) {
    bodyBG('clear_night.jpg');
  } else if (CONDITION.textContent === 'Rain' && hour >= 17) {
    bodyBG('rainy_night.jpg');
  } else if (CONDITION.textContent === 'Clouds' && hour >= 17) {
    bodyBG('cloudy_night.jpg');
  } else if (CONDITION.textContent === 'Fog') {
    bodyBG('fog.jpg');
  } else if (CONDITION.textContent === 'Drizzle') {
    bodyBG('drizzle.JPG');
  }

}

//Error handler
function error() {
  document.querySelector('.error').style.display = "block";
}
