const API = (function() {
    const appID = "08d6b636cccc477260e8ab2e95047782";
    let url;
    
    const fetchByGeolocation = (lat, long) =>{
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appID}`;
        return fetch(url).then(response=>response.json());
    };
    
    const fecthByName = name =>{
        url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${appID}`;
        return fetch(url).then(response=>response.json());
    };
    
    return {fetchByGeolocation, fecthByName};
}());